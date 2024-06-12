import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
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

// Fetch movies by genre
export const fetchMoviesByGenre = createAsyncThunk(
  "movies/fetchMoviesByGenre",
  async ({ genreId, genreName }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: 1,
          with_genres: genreId,
        },
      });
      return { genreName, movies: response.data.results };
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Async thunk for fetching movie details including cast and videos
export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          append_to_response: "credits,videos",
        },
      });
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

// Fetch actor details by ID
export const fetchActorById = createAsyncThunk(
  "actors/fetchActorById",
  async (actorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/person/${actorId}`, {
        params: {
          api_key: API_KEY,
          append_to_response: "movie_credits",
        },
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
  genres: {
    action: [],
    adventure: [],
    comedy: [],
    drama: [],
    fantasy: [],
  },
  movieDetails: {},
  actorDetails: {},
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
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        const { genreName, movies } = action.payload;
        state.genres[genreName] = movies;
        state.status = "succeeded";
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.movieDetails[action.meta.arg] = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload.results;
        state.status = "succeeded";
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchActorById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActorById.fulfilled, (state, action) => {
        state.actorDetails[action.meta.arg] = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchActorById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;

// Input selector to get movie details by ID
const selectMovieDetailsById = (state, movieId) =>
  state.movies.movieDetails[movieId];

// Memoized selector to get movie details
export const makeSelectMovieDetails = () =>
  createSelector([selectMovieDetailsById], (movieDetails) => ({
    ...movieDetails, // Ensures the result function transforms the input
    transformed: true, // Adding a dummy transformation to illustrate the concept
  }));

// Input selector to get actor details by ID
const selectActorDetailsById = (state, actorId) =>
  state.movies.actorDetails[actorId];

// Memoized selector to get actor details
export const makeSelectActorDetails = () =>
  createSelector([selectActorDetailsById], (actorDetails) => {
    if (actorDetails) {
      return {
        ...actorDetails,
        transformed: true, // Dummy transformation for illustration
      };
    }
    return {};
  });

// Memoized selector to get movies by category
export const selectMoviesByCategory = (category) =>
  createSelector(
    (state) => state.movies.categories[category] || [],
    (movies) => movies
  );

// Memoized selector to get movies by genre
export const selectMoviesByGenre = (genre) =>
  createSelector(
    (state) => state.movies.genres[genre] || [],
    (movies) => movies
  );
