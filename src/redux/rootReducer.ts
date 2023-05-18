import { combineReducers } from "@reduxjs/toolkit";
import courseReducer from "./Course/courseSlice";
import userReducer from "./User/userSlice";
import dashboardReducer from "./Dashboard/dashboardSlice";

const rootReducer = combineReducers({
  course: courseReducer,
  user: userReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
