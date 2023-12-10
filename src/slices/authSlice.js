import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set, get } from "firebase/database";
import { database } from "../services/firebaseApp";
import bcrypt from "bcryptjs";

// Helper function to save session with expiry time
const saveSession = (userData) => {
  const sessionData = {
    ...userData,
    expiryTime: new Date().getTime() + 6 * 60 * 60 * 1000, // current time in ms + 6 hours
  };
  localStorage.setItem("userSession", JSON.stringify(sessionData));
};

// Function to check if the session is still valid
const isSessionValid = () => {
  const sessionData = JSON.parse(localStorage.getItem("userSession"));
  return sessionData && new Date().getTime() < sessionData.expiryTime;
};

// Async thunk for registering a new user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ nrpNim, fullName, email, password }, { rejectWithValue }) => {
    try {
      if (!nrpNim || !fullName || !email || !password) {
        return rejectWithValue("Please provide all required information");
      }

      const userSnapshot = await get(ref(database, `users/${nrpNim}`));
      if (userSnapshot.exists()) {
        return rejectWithValue("User with this NRP/NIM already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await set(ref(database, `users/${nrpNim}`), {
        userId: nrpNim,
        fullName,
        email,
        password: hashedPassword,
        role: "examinee",
      });
      return { nrpNim, email };
    } catch (error) {
      let errorMessage = `Registration failed: ${error.code || ""} ${
        error.message || ""
      }`;
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ nrpNim, password }, { rejectWithValue }) => {
    try {
      const userRef = ref(database, `users/${nrpNim}`);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        throw new Error("User not found");
      }
      const userData = snapshot.val();
      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch) {
        throw new Error("Incorrect password");
      }
      const userSessionData = {
        nrpNim,
        fullName: userData.fullName,
        role: userData.role,
      };
      saveSession(userSessionData);
      return userSessionData;
    } catch (error) {
      let errorMessage = `Login failed: ${error.code || ""} ${
        error.message || ""
      }`;
      return rejectWithValue(errorMessage);
    }
  }
);

// Define the initial state for the auth slice
const initialState = {
  user: isSessionValid()
    ? JSON.parse(localStorage.getItem("userSession"))
    : null,
  isAuthenticated: isSessionValid(),
  isLoading: false,
  error: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer to handle user logout
    logoutUser: (state) => {
      localStorage.removeItem("userSession");
      state.user = null;
      state.isAuthenticated = false;
      state.isRegistered = false;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isRegistered = true;
      state.user = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
