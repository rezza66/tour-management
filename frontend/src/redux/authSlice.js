import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const token = response.data.data.token; 
      localStorage.setItem("accessToken", token); 

      return { user: response.data.data, token: token }; 
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message); 
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  dispatch(clearUser());
  localStorage.removeItem("accessToken"); 
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user; // Menyimpan data user di state
        localStorage.setItem("accessToken", action.payload.token); // Menyimpan token di localStorage
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Logout User
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

// Ekspor actions
export const { clearUser } = authSlice.actions;

// Ekspor reducer
export default authSlice.reducer;
