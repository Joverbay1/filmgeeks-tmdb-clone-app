import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
});

export default rootReducer;
