import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL =
  process.env.REACT_APP_TMDB_URL || "https://api.themoviedb.org/3";

if (!API_KEY) {
  throw new Error(
    "API key is missing. Please add REACT_APP_TMDB_API_KEY to your .env file."
  );
}

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Generic error handling function
function handleError(error, details) {
  console.error("API Error:", { error: error.message, ...details });
  return {
    message: `API request failed: ${error.message}. Please try again later.`,
    details,
  };
}

const fetchData = async (url, params, details) => {
  try {
    const response = await tmdbApi.get(url, { params });
    return response.data;
  } catch (error) {
    return handleError(error, details);
  }
};

export const fetchMoviesByCategory = (category = "popular", page = 1) =>
  fetchData(
    `/movie/${category}`,
    { page },
    { context: "Fetching movies by category", category, page }
  );

export const fetchMovieDetails = (movieId) =>
  fetchData(
    `/movie/${movieId}`,
    {},
    { context: "Fetching movie details", movieId }
  );

export const searchMovies = (query, page = 1) =>
  fetchData(
    "/search/movie",
    { query, page },
    { context: "Searching movies", query, page }
  );
