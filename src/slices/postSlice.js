import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, child, get, set, update } from "firebase/database";
import { database } from "../services/firebaseApp";

export const updateOrCreate = createAsyncThunk(
  "post/updateOrCreate",
  async ({ path, data }) => {
    const dbPath = child(ref(database), path);
    const snapshot = await get(dbPath);
    if (snapshot.exists()) {
      await update(dbPath, data);
    } else {
      await set(dbPath, data);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: {
    [updateOrCreate.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateOrCreate.fulfilled]: (state) => {
      state.loading = false;
      state.error = null;
    },
    [updateOrCreate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default postSlice.reducer;
