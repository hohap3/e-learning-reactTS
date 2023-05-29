import { combineReducers } from "@reduxjs/toolkit";
import courseReducer from "./Course/courseSlice";
import userReducer from "./User/userSlice";
import dashboardReducer from "./Dashboard/dashboardSlice";
import navbarReducer from "./Navbar/navbar";

const rootReducer = combineReducers({
  course: courseReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  navbar: navbarReducer,
});

export default rootReducer;
