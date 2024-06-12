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

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow-next`}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow-prev`}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    />
  );
};

const CardGrid = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.movies.categories || {});
  const genres = useSelector((state) => state.movies.genres || {});
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    ["popular", "now_playing", "upcoming", "top_rated"].forEach((category) =>
      dispatch(fetchMoviesByCategory({ category }))
    );
    const genresToFetch = [
      { genreId: 28, genreName: "action" },
      { genreId: 12, genreName: "adventure" },
      { genreId: 35, genreName: "comedy" },
      { genreId: 18, genreName: "drama" },
      { genreId: 14, genreName: "fantasy" },
    ];
    genresToFetch.forEach((genre) => dispatch(fetchMoviesByGenre(genre)));
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
            <Link to={`/genre/${key}`} className={styles.linkButton}>
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
