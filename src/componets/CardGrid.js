import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../redux/moviesSlice";
import MovieCard from "./MovieCard";
import "./CardGrid.css";

const CardGrid = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    dispatch(fetchMovies({ category: "popular", page: 1 }));
  }, [dispatch]);
  return (
    <div className="card-grid">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default CardGrid;
