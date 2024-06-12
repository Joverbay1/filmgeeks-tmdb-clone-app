import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CardGrid from "./components/CardGrid";
import MovieDetails from "./components/MovieDetails";
import SearchResults from "./components/SearchResults";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import MyAccount from "./components/MyAccount";
import ActorDetails from "./components/ActorDetails";
import CategoryMovies from "./components/CategoryMovies";
import BackToTop from "./components/BackToTop";
import Breadcrumbs from "./components/Breadcrumbs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<CardGrid />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/category/:categoryOrGenre" element={<CategoryMovies />} />
        <Route path="/genre/:genreName" element={<CategoryMovies />} />{" "}
        {/* Add this line */}
        <Route path="/actor/:id" element={<ActorDetails />} />
      </Routes>
      <BackToTop /> {/* Add the BackToTop component here */}
    </div>
  );
};

export default App;
