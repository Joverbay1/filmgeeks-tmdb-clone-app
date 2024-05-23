import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice"; // Assuming moviesSlice.js contains the movies reducer
// Import other reducers as needed
// import userReducer from './userSlice';

const rootReducer = combineReducers({
  movies: moviesReducer,
  // Add other reducers here as your application grows
  // user: userReducer,
});

export default rootReducer;
