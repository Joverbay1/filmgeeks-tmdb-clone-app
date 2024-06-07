import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CardGrid from "./components/CardGrid";
import MovieDetails from "./components/MovieDetails";
import SearchResults from "./components/SearchResults";
import SignUp from "./components/SignUp";
import MyAccount from "./components/MyAccount";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import CategoryMovies from "./components/CategoryMovies";
import axios from "axios";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Token received:", tokenResponse);
      setUser(tokenResponse);
      // Optionally, you can navigate to a specific page after login
      // navigate('/account');
    },
    onError: (error) => console.log("Login Failed:", error),
    scope: "email profile openid",
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));

      const timer = setTimeout(() => {
        console.log("Token expired");
        googleLogout();
        setUser(null);
        setProfile(null);
      }, user.expires_in * 1000); // Convert to milliseconds

      return () => clearTimeout(timer);
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CardGrid />
              {profile ? (
                <div>
                  <img src={profile.picture} alt={`${profile.name}`} />
                  <h3>User Logged In</h3>
                  <p>Name: {profile.name}</p>
                  <p>Email: {profile.email}</p>
                  <button onClick={logOut}>Log out</button>
                </div>
              ) : (
                <button onClick={login}>Sign in with Google 🚀</button>
              )}
            </>
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/category/:categoryOrGenre" element={<CategoryMovies />} />
      </Routes>
    </div>
  );
}

export default App;
