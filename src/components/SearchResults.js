import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import styles from "./SearchResults.module.css";

const SearchResults = () => {
  const searchResults = useSelector((state) => state.movies.searchResults);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  return (
    <div className={styles.searchResults}>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {searchResults.length > 0 ? (
        searchResults.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default SearchResults;
