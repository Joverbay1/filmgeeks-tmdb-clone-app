import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMoviesByCategory,
  fetchMoviesByGenre,
  selectMoviesByCategory,
  selectMoviesByGenre,
} from "../redux/moviesSlice";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";
import styles from "./CategoryMovies.module.css";

const CategoryMovies = () => {
  const { categoryOrGenre, genreName } = useParams();
  const dispatch = useDispatch();
  const categoryOrGenreParam = categoryOrGenre || genreName;
  const moviesByCategory = useSelector((state) =>
    selectMoviesByCategory(categoryOrGenreParam)(state)
  );
  const moviesByGenre = useSelector((state) =>
    selectMoviesByGenre(categoryOrGenreParam)(state)
  );
  const movies = moviesByCategory.length ? moviesByCategory : moviesByGenre;
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (
      status === "idle" ||
      (!moviesByCategory.length && !moviesByGenre.length)
    ) {
      if (
        ["popular", "now_playing", "upcoming", "top_rated"].includes(
          categoryOrGenreParam
        )
      ) {
        dispatch(fetchMoviesByCategory({ category: categoryOrGenreParam }));
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
            genreId: genreMap[categoryOrGenreParam],
            genreName: categoryOrGenreParam,
          })
        );
      }
    }
  }, [
    dispatch,
    categoryOrGenreParam,
    status,
    moviesByCategory.length,
    moviesByGenre.length,
  ]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <p>Error: {error?.message || "Something went wrong"}</p>;
  }

  return (
    <div className={styles.categoryMovies}>
      <h2>{categoryOrGenreParam.replace("_", " ").toUpperCase()}</h2>
      <div className={styles.movieGrid}>
        {movies.length ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies available.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryMovies;
