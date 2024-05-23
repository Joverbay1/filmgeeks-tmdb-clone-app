import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={imageUrl} alt={movie.title} />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.overview.substring(0, 100)}...</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
