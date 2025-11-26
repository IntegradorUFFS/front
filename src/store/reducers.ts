import auth from "./auth";
import layout from "./layout";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
  auth,
  layout,
});
