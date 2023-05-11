import { all } from "redux-saga/effects";
import courseSaga from "redux/Course/courseSaga";
import userSaga from "redux/User/userSaga";

function* rootSaga() {
  yield all([courseSaga(), userSaga()]);
}

export default rootSaga;
