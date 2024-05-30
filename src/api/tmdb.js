import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL =
  process.env.REACT_APP_TMDB_URL || "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Generic error handling function
function handleError(error, details) {
  console.error("API Error:", { error: error.message, ...details });
  throw new Error(
    `API request failed: ${error.message}. Please try again later.`
  );
}

export const fetchMoviesByCategory = async (category = "popular", page = 1) => {
  try {
    const response = await tmdbApi.get(`/movie/${category}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    handleError(error, {
      context: "Fetching movies by category",
      category,
      page,
    });
    return;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    handleError(error, { context: "Fetching movie details", movieId });
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get("/search/movie", {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    handleError(error, { context: "Searching movies", query, page });
  }
};
