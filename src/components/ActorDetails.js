import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActorById, makeSelectActorDetails } from "../redux/moviesSlice";
import { useParams, Link } from "react-router-dom";
import Spinner from "./Spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ActorDetails.css";

const ActorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectActorDetails = makeSelectActorDetails();
  const actor = useSelector((state) => selectActorDetails(state, id));
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (!actor || Object.keys(actor).length === 0) {
      dispatch(fetchActorById(id));
    }
  }, [dispatch, id, actor]);

  useEffect(() => {
    console.log("Actor Data:", actor);
  }, [actor]);

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

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <p>Error: {error?.message || "Something went wrong"}</p>;
  }

  if (!actor || !actor.transformed) {
    return null;
  }

  return (
    <div className="actor-details-container">
      <div className="actor-details">
        <nav className="actor-details-nav">
          <a href="#biography">Biography</a>
          <a href="#known-for">Known For</a>
          <a href="#filmography">Filmography</a>
        </nav>
        <div className="actor-header">
          {actor.profile_path && (
            <img
              className="actor-photo"
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
            />
          )}
          <div className="actor-info">
            <h2>{actor.name}</h2>
            <p className="actor-biography">
              <strong>Biography:</strong> {actor.biography}
            </p>
            <div className="actor-meta">
              <p>
                <strong>Birthday:</strong> {actor.birthday}
              </p>
              {actor.deathday && (
                <p>
                  <strong>Deathday:</strong> {actor.deathday}
                </p>
              )}
              <p>
                <strong>Place of Birth:</strong> {actor.place_of_birth}
              </p>
              <p>
                <strong>Also Known As:</strong>{" "}
                {actor.also_known_as?.join(", ")}
              </p>
              <p>
                <strong>Popularity:</strong> {actor.popularity}
              </p>
              {actor.homepage && (
                <p>
                  <strong>Homepage:</strong>{" "}
                  <a
                    href={actor.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {actor.homepage}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
        <div id="known-for" className="actor-section">
          <h3>Known For</h3>
          {actor.movie_credits?.cast && actor.movie_credits.cast.length > 0 ? (
            <Slider {...settings}>
              {actor.movie_credits.cast.map((movie) => (
                <Link
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                  className="known-for-card"
                >
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                  <div className="known-for-info">
                    <p className="known-for-title">{movie.title}</p>
                  </div>
                </Link>
              ))}
            </Slider>
          ) : (
            <p>No known for movies available.</p>
          )}
        </div>
        <div id="filmography" className="actor-section">
          <h3>Filmography</h3>
          {actor.movie_credits?.cast && actor.movie_credits.cast.length > 0 ? (
            <ul>
              {actor.movie_credits.cast.map((movie) => (
                <li key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>{movie.title}</Link> as{" "}
                  {movie.character}
                </li>
              ))}
            </ul>
          ) : (
            <p>No filmography available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
