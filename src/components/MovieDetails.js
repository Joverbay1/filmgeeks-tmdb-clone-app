import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieById, makeSelectMovieDetails } from "../redux/moviesSlice";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faHeart,
  faClock,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import CircularRating from "./CircularRating";
import Spinner from "./Spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectMovieDetails = makeSelectMovieDetails();
  const movie = useSelector((state) => selectMovieDetails(state, id));
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);

  useEffect(() => {
    if (!movie.title) {
      dispatch(fetchMovieById(id));
    }
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

  // Extracting director and writer information
  const director = movie.credits?.crew?.find((crew) => crew.job === "Director");
  const writers = movie.credits?.crew?.filter((crew) =>
    ["Screenplay", "Writer", "Story"].includes(crew.job)
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="movie-details-container">
      {status === "loading" && <Spinner />}
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
                {director && (
                  <p>
                    <strong>Director:</strong> {director.name}
                  </p>
                )}
                {writers && writers.length > 0 && (
                  <p>
                    <strong>Writer{writers.length > 1 ? "s" : ""}:</strong>{" "}
                    {writers.map((writer) => writer.name).join(", ")}
                  </p>
                )}
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
                <CircularRating rating={movie.vote_average * 10} />
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
            <Slider {...settings}>
              {movie.credits?.cast?.slice(0, 10).map((cast) => (
                <Link
                  to={`/actor/${cast.id}`}
                  key={cast.id}
                  className="actor-card"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                    alt={cast.name}
                  />
                  <div className="actor-info">
                    <p className="actor-name">{cast.name}</p>
                    <p className="actor-character">{cast.character}</p>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
          <div id="full-cast" className="movie-section full-cast-section">
            <h3>Full Cast & Crew</h3>
            <Slider {...settings}>
              {movie.credits?.cast?.map((cast) => (
                <Link
                  to={`/actor/${cast.id}`}
                  key={cast.id}
                  className="full-cast-card"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                    alt={cast.name}
                  />
                  <div className="full-cast-info">
                    <p className="full-cast-name">{cast.name}</p>
                    <p className="full-cast-character">{cast.character}</p>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
