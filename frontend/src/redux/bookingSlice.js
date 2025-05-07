import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/config";

// Async thunk untuk fetch bookings dan revenue trends
export const fetchBookingsRevenueTrends = createAsyncThunk(
  "bookings/fetchBookingsRevenueTrends",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return rejectWithValue("Token not found");
    }

    try {
      const response = await axios.get(`${BASE_URL}/bookings/revenue`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch bookings berdasarkan user
export const fetchBookingsByUser = createAsyncThunk(
  "bookings/fetchBookingsByUser",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return rejectWithValue("Token not found");
    }

    try {
      const response = await axios.get(`${BASE_URL}/my-bookings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch semua bookings
export const fetchAllBookings = createAsyncThunk(
  "bookings/fetchAllBookings",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return rejectWithValue("Token not found");
    }

    try {
      const response = await axios.get(`${BASE_URL}/allbooking`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Booking slice
const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookingsRevenueTrends: [],
    totalRevenue: 0,
    userBookings: [],
    allBookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handling fetch bookings revenue trends
    builder
      .addCase(fetchBookingsRevenueTrends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingsRevenueTrends.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingsRevenueTrends = action.payload;
        // Calculate total revenue from trends
        state.totalRevenue = action.payload.reduce(
          (total, trend) => total + trend.totalRevenue,
          0
        );
      })
      .addCase(fetchBookingsRevenueTrends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Handling fetch bookings by user
      .addCase(fetchBookingsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload; // Update user bookings
      })
      .addCase(fetchBookingsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Handling fetch all bookings
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.allBookings = action.payload.data; // Update all bookings
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default bookingSlice.reducer;
