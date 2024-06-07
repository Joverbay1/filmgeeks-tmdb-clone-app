import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMoviesByCategory,
  fetchMoviesByGenre,
} from "../redux/moviesSlice";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./CardGrid.module.css";
import { Link } from "react-router-dom";

const CardGrid = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.movies.categories || {});
  const genres = useSelector((state) => state.movies.genres || {});
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    // Fetch movies for each category on component mount
    ["popular", "now_playing", "upcoming", "top_rated"].forEach((category) =>
      dispatch(fetchMoviesByCategory({ category }))
    );
    // Fetch movies for each genre on component mount
    dispatch(fetchMoviesByGenre({ genreId: 28, genreName: "action" }));
    dispatch(fetchMoviesByGenre({ genreId: 12, genreName: "adventure" }));
    dispatch(fetchMoviesByGenre({ genreId: 35, genreName: "comedy" }));
    dispatch(fetchMoviesByGenre({ genreId: 18, genreName: "drama" }));
    dispatch(fetchMoviesByGenre({ genreId: 14, genreName: "fantasy" }));
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
    <div className={styles.cardGrid}>
      {status === "loading" && <Spinner />}
      {status === "failed" && <p>Error: {error.message}</p>}
      {Object.entries(categories).map(([key, movies]) => (
        <div key={key} className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <h2 className={styles.categoryTitle}>
              {key.replace("_", " ").toUpperCase()}
            </h2>
            <Link to={`/category/${key}`} className={styles.linkButton}>
              See all
            </Link>
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
      {Object.entries(genres).map(([key, movies]) => (
        <div key={key} className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <h2 className={styles.categoryTitle}>
              {key.replace("_", " ").toUpperCase()}
            </h2>
            <Link to={`/category/${key}`} className={styles.linkButton}>
              See all
            </Link>
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
