import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMoviesByCategory,
  fetchMovieDetails,
  searchMovies as searchMoviesApi,
} from "../api/tmdb";

// Existing thunks
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ category, page }, { rejectWithValue }) => {
    try {
      const movies = await fetchMoviesByCategory(category, page);
      return movies;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (movieId, { rejectWithValue }) => {
    try {
      const movie = await fetchMovieDetails(movieId);
      return movie;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Define the searchMovies thunk
export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const results = await searchMoviesApi(query, page);
      return results;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Slice
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    movieDetails: {},
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.results;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.movieDetails[action.meta.arg] = action.payload;
      })
      // Add cases for searchMovies
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.results;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export default moviesSlice.reducer;
