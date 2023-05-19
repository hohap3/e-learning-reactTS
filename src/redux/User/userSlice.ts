import { RootState } from "./../../app/store";

import { User, UserProps, UserSignIn } from "./../../models/user";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { studentImage } from "constants/common";
import {
  ListResponseAccount,
  CourseItem,
  CourseItemRegister,
  ListParams,
  Pagination,
  ListResponse,
} from "../../models";

export interface UserListPagination {
  userList: UserProps[];
  filter: ListParams;
  pagination: Pagination;
}

export interface UserState {
  loading: boolean;
  userList: User[];
  hasLogin: boolean;
  loginInfo: Partial<ListResponseAccount<CourseItem>>;
  userListPagination: UserListPagination;
}

const initialState: UserState = {
  loading: false,
  userList: [],
  hasLogin: false,
  loginInfo: {},
  userListPagination: {
    userList: [],
    filter: {
      page: 1,
      pageSize: 10,
    },
    pagination: {
      currentPage: 1,
      count: 10,
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserPagination(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },

    fetchUserPaginationSuccess(
      state,
      action: PayloadAction<ListResponse<UserProps>>
    ) {
      state.loading = false;
      state.userListPagination.userList = action.payload.items;
      state.userListPagination.pagination = {
        currentPage: action.payload.currentPage,
        count: action.payload.count,
        totalPages: action.payload.totalPages,
        totalCount: action.payload.totalCount,
      };
    },

    fetchUserPaginationFailed(state) {
      state.loading = false;
    },

    fetchUserList(state) {
      state.loading = true;
    },

    fetchUserListSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.userList = action.payload;
    },

    fetchUserListFailed(state) {
      state.loading = false;
    },

    fetchLogin(
      state,
      action: PayloadAction<ListResponseAccount<CourseItem>>
    ): void {
      state.loading = true;
    },

    fetchLoginSuccess(
      state,
      action: PayloadAction<ListResponseAccount<CourseItem>>
    ) {
      state.loading = false;
      state.hasLogin = true;
      state.loginInfo = action.payload;
    },

    fetchLoginFailed(state) {
      state.hasLogin = false;
      state.loading = false;
    },

    logout(state) {
      state.hasLogin = false;
      state.loginInfo = {};
    },

    resetRegisteredCourse(state) {
      state.loginInfo = {
        ...state.loginInfo,
        chiTietKhoaHocGhiDanh: [],
      };
    },

    insertUserPaginationFilter(state, action: PayloadAction<ListParams>) {
      state.userListPagination.filter = action.payload;
    },

    resetUserPagination(state) {
      state.userListPagination = {
        userList: [],
        filter: {
          page: 1,
          pageSize: 10,
        },
        pagination: {
          currentPage: 1,
          count: 10,
        },
      };
    },
  },
});

// actions
export const userAction = userSlice.actions;

// Selectors
export const selectUserList = (state: RootState) => state.user.userList;
export const selectUserListTestimonial = createSelector(
  selectUserList,
  (userList) =>
    userList
      .slice(0, 4)
      .map((user, idx) => ({ ...user, image: studentImage[idx].image }))
);

export const selectHasLogin = (state: RootState) => state.user.hasLogin;

export const selectLoginInfo = (state: RootState) => state.user.loginInfo;
export const selectLoadingUser = (state: RootState) => state.user.loading;
export const selectUserPaginationList = (state: RootState) =>
  state.user.userListPagination.userList;

export const selectUserPaginationMapList = createSelector(
  selectUserPaginationList,
  (userList) => {
    return userList.map((user) => ({
      key: user.taiKhoan,
      taiKhoan: user.taiKhoan,
      hoTen: user.hoTen,
      soDT: user.soDT,
      email: user.email,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
    }));
  }
);

export const selectUserPagination = (state: RootState) =>
  state.user.userListPagination.pagination;

// reducers
const userReducer = userSlice.reducer;
export default userReducer;
