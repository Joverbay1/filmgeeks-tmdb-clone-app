import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMovies } from "../redux/moviesSlice";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchMovies({ query: searchTerm, page: 1 }));
    }
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">TMDB Clone</Link>
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;
