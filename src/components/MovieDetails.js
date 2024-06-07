import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieById } from "../redux/moviesSlice";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faHeart,
  faClock,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import CircularRating from "./CircularRating"; // Import the CircularRating component
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movieDetails[id] || {});
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);

  useEffect(() => {
    if (!movie.title) {
      dispatch(fetchMovieById(id));
    }
    console.log(movie); // Log the movie object to verify the data structure
  }, [dispatch, id, movie]);

  const handleCreateEditList = () => {
    if (isLoggedIn) {
      console.log("Creating or editing list...");
    } else {
      alert("Please log in to create or edit a list.");
    }
  };

  const handleAddToFavorites = () => {
    if (isLoggedIn) {
      console.log("Adding to favorites...");
    } else {
      alert("Please log in to add this movie to your favorites.");
    }
  };

  const handleAddToWatchList = () => {
    if (isLoggedIn) {
      console.log("Adding to watch list...");
    } else {
      alert("Please log in to add this movie to your watch list.");
    }
  };

  const trailerUrl = movie.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  )?.key;

  return (
    <div className="movie-details-container">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error.message}</p>}
      {movie.title && (
        <div className="movie-details">
          <nav className="movie-details-nav">
            <a href="#overview">Overview</a>
            <a href="#cast">Top Billed Cast</a>
            <a href="#full-cast">Full Cast & Crew</a>
          </nav>
          <div className="movie-header">
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h2>
                {movie.title} ({movie.release_date.split("-")[0]})
              </h2>
              <div className="movie-meta">
                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p>
                  <strong>Genres:</strong>{" "}
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>
              <p className="movie-overview">
                <strong>Overview:</strong> {movie.overview}
              </p>
              <div className="movie-crew">
                <p>
                  <strong>Director:</strong> {movie.director}
                </p>
                <p>
                  <strong>Writer:</strong> {movie.writer}
                </p>
              </div>
              <div className="movie-meta">
                <p>
                  <strong>Runtime:</strong> {movie.runtime} minutes
                </p>
                <p>
                  <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                </p>
                <p>
                  <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                </p>
              </div>
              <div className="movie-rating">
                <CircularRating rating={movie.vote_average * 10} />{" "}
                <div className="rating-label">User Score</div>
              </div>
              <div className="movie-actions">
                <button
                  onClick={handleCreateEditList}
                  className="action-button"
                >
                  <FontAwesomeIcon icon={faList} className="action-icon" />
                </button>
                <button
                  onClick={handleAddToFavorites}
                  className="action-button"
                >
                  <FontAwesomeIcon icon={faHeart} className="action-icon" />
                </button>
                <button
                  onClick={handleAddToWatchList}
                  className="action-button"
                >
                  <FontAwesomeIcon icon={faClock} className="action-icon" />
                </button>
                {trailerUrl && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailerUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="trailer-button"
                  >
                    <FontAwesomeIcon icon={faPlay} /> Play Trailer
                  </a>
                )}
              </div>
              {movie.homepage && (
                <div className="movie-links">
                  <span>Official Website: </span>
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {movie.homepage}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div id="cast" className="movie-section">
            <h3>Top Billed Cast</h3>
            <div className="cast-grid">
              {movie.credits?.cast?.slice(0, 6).map((actor) => (
                <Link
                  to={`/actor/${actor.id}`}
                  key={actor.id}
                  className="actor-card"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                  />
                  <p>{actor.name}</p>
                  <p>{actor.character}</p>
                </Link>
              ))}
            </div>
          </div>
          <div id="full-cast" className="movie-section">
            <h3>Full Cast & Crew</h3>
            {/* Add full cast and crew rendering here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
