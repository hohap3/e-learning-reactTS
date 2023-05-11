import { takeLatest, call, put } from "redux-saga/effects";
import { userAction } from "./userSlice";
import userApi from "api/userAPI";
import {
  CourseItem,
  ListResponseAccount,
  User,
  UserSignIn,
} from "../../models";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchUserList() {
  try {
    const res: Array<User> = yield call(userApi.getUserList);

    yield put(userAction.fetchUserListSuccess(res));
  } catch (error) {
    console.log(error);
    yield put(userAction.fetchUserListFailed());
  }
}

function* fetchLogin(action: PayloadAction<ListResponseAccount<CourseItem>>) {
  yield put(userAction.fetchLoginSuccess(action.payload));
}

function* userSaga() {
  yield takeLatest(userAction.fetchUserList.type, fetchUserList);
  yield takeLatest(userAction.fetchLogin.type, fetchLogin);
}

export default userSaga;
