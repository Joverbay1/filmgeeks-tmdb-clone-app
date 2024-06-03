import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_URL;

// Fetch movies by category
export const fetchMoviesByCategory = createAsyncThunk(
  "movies/fetchMoviesByCategory",
  async ({ category }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${category}`, {
        params: { api_key: API_KEY, language: "en-US", page: 1 },
      });
      return { category, movies: response.data.results };
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Async thunk for fetching movie details
export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Async thunk for searching movies
export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { query, page, api_key: API_KEY },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

const initialState = {
  categories: {
    popular: [],
    now_playing: [],
    upcoming: [],
    top_rated: [],
  },
  movieDetails: {},
  searchResults: [],
  status: "idle",
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        const { category, movies } = action.payload;
        state.categories[category] = movies;
        state.status = "succeeded";
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle fetchMovieById
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.movieDetails[action.meta.arg] = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle searchMovies
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload.results;
        state.status = "succeeded";
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
