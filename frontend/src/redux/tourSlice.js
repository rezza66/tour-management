import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../utils/config';

// Async Thunk untuk fetch semua tours dengan pagination
export const fetchAllTours = createAsyncThunk('tours/fetchAllTours', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/tours?page=${page}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data); 
  }
});

// Async Thunk untuk fetch featured tours
export const fetchFeaturedTours = createAsyncThunk('tours/fetchFeaturedTours', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/tours/search/getFeaturedTours`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async Thunk untuk fetch jumlah total tours
export const getTourCount = createAsyncThunk('tours/getTourCount', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/tourCount`);
    return response.data; // Pastikan response data berisi jumlah total tours
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async Thunk untuk fetch recent tours
export const getRecentTours = createAsyncThunk('tours/getRecentTours', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/recent`);
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const tourSlice = createSlice({
  name: 'tours',
  initialState: {
    allTours: [], 
    featuredTours: [],
    recentTours: [], 
    loading: false,
    error: null,
    tourCount: 0, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTours.fulfilled, (state, action) => {
        state.loading = false;
        state.allTours = action.payload.data;
        state.pageCount = Math.ceil(action.payload.totalTours / 8); 
      })
      .addCase(fetchAllTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Untuk featured tours
      .addCase(fetchFeaturedTours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedTours.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredTours = action.payload.data;
      })
      .addCase(fetchFeaturedTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Untuk mendapatkan jumlah total tours
      .addCase(getTourCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTourCount.fulfilled, (state, action) => {
        state.loading = false;
        state.tourCount = action.payload.data; // Menyimpan jumlah total tours
      })
      .addCase(getTourCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Untuk recent tours
      .addCase(getRecentTours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecentTours.fulfilled, (state, action) => {
        state.loading = false;
        state.recentTours = action.payload.data; // Menyimpan recent tours
      })
      .addCase(getRecentTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// Ekspor actions
export const { setPageCount } = tourSlice.actions;

// Ekspor reducer
export default tourSlice.reducer;
