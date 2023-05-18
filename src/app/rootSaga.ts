import { all } from "redux-saga/effects";
import courseSaga from "redux/Course/courseSaga";
import dashboardSaga from "redux/Dashboard/dashboardSaga";
import userSaga from "redux/User/userSaga";

function* rootSaga() {
  yield all([courseSaga(), userSaga(), dashboardSaga()]);
}

export default rootSaga;
