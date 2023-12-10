import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get } from "firebase/database";
import { database } from "../services/firebaseApp";

// Async thunk for fetching data
export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (path, { rejectWithValue }) => {
    try {
      const userRef = ref(database, path);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw new Error("No data available at path: " + path);
      }
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Define the initial state for the data slice
const initialState = {
  data: null,
  isLoading: true,
  error: null,
};

// Create the data slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [fetchData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default dataSlice.reducer;
