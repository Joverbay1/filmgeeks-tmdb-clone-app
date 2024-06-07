import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchMoviesByCategory,
  fetchMoviesByGenre,
} from "../redux/moviesSlice";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import styles from "./CategoryMovies.module.css";

const CategoryMovies = () => {
  const { categoryOrGenre } = useParams();
  const dispatch = useDispatch();
  const movies = useSelector(
    (state) =>
      state.movies.genres[categoryOrGenre] ||
      state.movies.categories[categoryOrGenre] ||
      []
  );
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (
      ["popular", "now_playing", "upcoming", "top_rated"].includes(
        categoryOrGenre
      )
    ) {
      dispatch(fetchMoviesByCategory({ category: categoryOrGenre }));
    } else {
      const genreMap = {
        action: 28,
        adventure: 12,
        comedy: 35,
        drama: 18,
        fantasy: 14,
      };
      dispatch(
        fetchMoviesByGenre({
          genreId: genreMap[categoryOrGenre],
          genreName: categoryOrGenre,
        })
      );
    }
  }, [dispatch, categoryOrGenre]);

  return (
    <div className={styles.categoryMovies}>
      <h2>{categoryOrGenre.replace("_", " ").toUpperCase()}</h2>
      {status === "loading" && <Spinner />}
      {status === "failed" && <p>Error: {error.message}</p>}
      <div className={styles.movieGrid}>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies available.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryMovies;
