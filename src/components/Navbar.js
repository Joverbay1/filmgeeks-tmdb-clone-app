import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../FilmGeeksLogo.jpg";
import { logout } from "../redux/userSlice";
import { searchMovies } from "../redux/moviesSlice"; // Import the searchMovies action

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchMovies({ query: searchTerm })); // Dispatch the searchMovies action
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`hamburger-menu ${menuActive ? "active" : ""}`}>
        <Link to="/" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/signup" onClick={toggleMenu}>
          Sign Up
        </Link>
        <Link to="/signin" onClick={toggleMenu}>
          Sign In
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/account" onClick={toggleMenu}>
              My Account
            </Link>
            <Link to="/watchlist" onClick={toggleMenu}>
              My Watch List
            </Link>
            <Link to="/favorites" onClick={toggleMenu}>
              My Favorites List
            </Link>
            <Link to="/edit-list" onClick={toggleMenu}>
              Create or Edit List
            </Link>
            <button onClick={handleLogout}>Log out</button>
          </>
        )}
      </div>
      {isLoggedIn && (
        <div className="user-info">
          <img
            src={userData.picture}
            alt={`${userData.name} profile`}
            style={{ width: "50px", borderRadius: "50%" }}
          />
          <span>{userData.name}</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
