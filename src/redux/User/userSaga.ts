import { takeLatest, call, put } from "redux-saga/effects";
import { userAction } from "./userSlice";
import userApi from "api/userAPI";
import {
  CourseItem,
  CourseItemRegister,
  ListResponseAccount,
  User,
  UserSignIn,
} from "../../models";
import { PayloadAction } from "@reduxjs/toolkit";
import { getMultipleRandom } from "../../utils";

function* fetchUserList() {
  try {
    const res: Array<User> = yield call(userApi.getUserList);

    const testimonialList = getMultipleRandom(res, 4);

    yield put(userAction.fetchUserListSuccess(testimonialList));
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
