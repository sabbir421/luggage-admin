// src/redux/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./auth";

const rootReducer = combineReducers({
  adminReducher: authReducer,
});

export default rootReducer;
