import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMovies } from "../redux/moviesSlice";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import "./Navbar.css";
import logo from "../FilmGeeksLogo.jpg";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
    setIsLoggedIn(true);
    setUserData(response);
    setError(""); // Clear any error messages on successful login
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
    setError("Login failed. Please try again.");
  };

  const handleLogout = () => {
    googleLogout();
    setIsLoggedIn(false);
    setUserData({});
    setError(""); // Clear any error messages on logout
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchMovies({ query: searchTerm, page: 1 }));
      setError(""); // Clear errors when a new search is initiated
      navigate("/search"); // Navigate to search results page
    }
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ width: "80px" }} />
        </Link>
      </div>
      <div className={`nav-links ${menuActive ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/add-movies">Add Movies</Link>
        <Link to="/edit-list">Edit List</Link>
        <Link to="/edit-account">Edit Account</Link>
        <Link to="/create-list">Create List</Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
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
      {!isLoggedIn ? (
        <>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            useOneTap
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
        </>
      ) : (
        <button onClick={handleLogout}>Log out</button>
      )}
      {isLoggedIn && (
        <div>
          <img
            src={userData.picture}
            alt={`${userData.name} profile`}
            style={{ width: "50px" }}
          />
          <span>{userData.name}</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
