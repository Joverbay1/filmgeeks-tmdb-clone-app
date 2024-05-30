import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../redux/moviesSlice";
import MovieCard from "./MovieCard";
import "./CardGrid.css";
import { Spinner } from "./Spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardGrid = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    dispatch(fetchMovies({ category: "popular", page: 1 }));
  }, [dispatch]);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
          initialSlide: 2,
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
    <div className="card-grid">
      {status === "loading" && <Spinner />}
      {status === "failed" && (
        <p>
          Error: {error}{" "}
          <button
            onClick={() =>
              dispatch(fetchMovies({ category: "popular", page: 1 }))
            }
          >
            Retry
          </button>
        </p>
      )}
      {movies.length === 0 && status === "succeeded" && (
        <p>No movies available.</p>
      )}
      <Slider {...settings}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default CardGrid;
