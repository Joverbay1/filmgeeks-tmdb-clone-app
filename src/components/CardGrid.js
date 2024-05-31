import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesByCategory } from "../redux/moviesSlice";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CardGrid.css";

const CardGrid = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.movies.categories);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    // Fetch movies for each category on component mount
    ["popular", "now_playing", "upcoming", "top_rated"].forEach((category) =>
      dispatch(fetchMoviesByCategory({ category }))
    );
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5, // Show 5 slides at a time
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
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="card-grid">
      {status === "loading" && <Spinner />}
      {status === "failed" && <p>Error: {error}</p>}
      {Object.entries(categories).map(([key, movies]) => (
        <div key={key} className="category-section">
          <div className="category-header">
            <h2 className="category-title">
              {key.replace("_", " ").toUpperCase()}
            </h2>
            <button className="link-button">See all</button>
          </div>
          <Slider {...settings}>
            {movies && movies.length > 0 ? (
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              <p>No movies available.</p>
            )}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
