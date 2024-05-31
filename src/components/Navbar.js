import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { searchMovies } from "../redux/moviesSlice";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import "./Navbar.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLoginSuccess = useCallback((response) => {
    console.log("Login Success:", response);
    setIsLoggedIn(true);
    setUserData(response);
    setError(""); // Clear any error messages on successful login
  }, []);

  const handleLoginFailure = useCallback((error) => {
    console.error("Login Failed:", error);
    setError("Login failed. Please try again.");
  }, []);

  const handleLogout = useCallback(() => {
    googleLogout();
    setIsLoggedIn(false);
    setUserData({});
    setError(""); // Clear any error messages on logout
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchMovies({ query: searchTerm, page: 1 }));
      setError(""); // Clear errors when a new search is initiated
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/FilmGeeks Logo.jpg" alt="Logo" style={{ width: "80px" }} />
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
