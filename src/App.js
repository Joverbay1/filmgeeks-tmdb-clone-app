import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componets/Navbar";
import CardGrid from "./componets/CardGrid";
import MovieDetails from "./componets/MovieDetails";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact componet={CardGrid} />
          <Route path="/movie/:id" component={MovieDetails} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
