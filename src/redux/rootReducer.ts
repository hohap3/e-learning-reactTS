import { combineReducers } from "@reduxjs/toolkit";
import courseReducer from "./Course/courseSlice";
import userReducer from "./User/userSlice";

const rootReducer = combineReducers({
  course: courseReducer,
  user: userReducer,
});

export default rootReducer;
