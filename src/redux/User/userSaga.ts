import { takeLatest, call, put } from "redux-saga/effects";
import { userAction } from "./userSlice";
import userApi from "api/userAPI";
import {
  CourseItem,
  CourseItemRegister,
  ListParams,
  ListResponse,
  ListResponseAccount,
  User,
  UserInfoDetail,
  UserInformation,
  UserProps,
  UserPropsGet,
  UserSignIn,
} from "../../models";
import { PayloadAction } from "@reduxjs/toolkit";
import { getMultipleRandom } from "../../utils";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

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

function* fetchUserPagination(action: PayloadAction<ListParams>) {
  try {
    const res: ListResponse<UserProps> = yield call(() =>
      userApi.getUserListPagination(action.payload)
    );

    yield put(userAction.fetchUserPaginationSuccess(res));
    yield put(userAction.insertUserPaginationFilter(action.payload));
  } catch (error) {
    yield put(userAction.fetchUserPaginationFailed());
    console.log(error);
  }
}

function* fetchUserInfoProps(action: PayloadAction<ListParams>) {
  try {
    const res: ListResponse<UserProps> = yield call(() =>
      userApi.findUserDetail(action.payload)
    );

    const res2: UserInfoDetail[] = yield call(() =>
      userApi.findUserMoreDetail(action.payload)
    );

    if (res.items.length > 1 || res2.length > 1) {
      yield put(userAction.resetUserInfo());
      return;
    }

    const { soDt, tenLoaiNguoiDung, ...restData } = res2[0];
    const { maNhom, tenLoaiNguoiDung: tenL, ...rest } = res.items[0];

    const data: UserInformation = { ...rest, ...restData };

    yield put(userAction.fetchUserInfoPropsSuccess(data));
  } catch (error: any | AxiosError) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      yield put(userAction.fetchUserInfoPropsFailed());

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response?.data}`,
      });
    }
  }
}

function* userSaga() {
  yield takeLatest(userAction.fetchUserList.type, fetchUserList);
  yield takeLatest(userAction.fetchLogin.type, fetchLogin);
  yield takeLatest(userAction.fetchUserPagination.type, fetchUserPagination);
  yield takeLatest(userAction.fetchUserInfoProps.type, fetchUserInfoProps);
}

export default userSaga;
