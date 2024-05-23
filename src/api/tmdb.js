import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchMoviesByCategory = async (category = "popular", page = 1) => {
  const response = await tmdbApi.get(`/movie/${category}`, {
    params: { page },
  });
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await tmdbApi.get("/search/movie", {
    params: { query, page },
  });
  return response.data;
};
