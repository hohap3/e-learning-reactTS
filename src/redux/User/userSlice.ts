import { RootState } from "./../../app/store";

import { User, UserSignIn } from "./../../models/user";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { studentImage } from "constants/common";
import { ListResponseAccount, CourseItem } from "../../models";

export interface UserState {
  loading: boolean;
  userList: User[];
  hasLogin: boolean;
  loginInfo: Partial<ListResponseAccount<CourseItem>>;
}

const initialState: UserState = {
  loading: false,
  userList: [],
  hasLogin: false,
  loginInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
      return;
    },

    fetchLoginSuccess(
      state,
      action: PayloadAction<ListResponseAccount<CourseItem>>
    ) {
      state.hasLogin = true;
      state.loginInfo = action.payload;
    },

    fetchLoginFailed(state) {
      state.hasLogin = false;
    },

    logout(state) {
      state.hasLogin = false;
      state.loginInfo = {};
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

// reducers
const userReducer = userSlice.reducer;
export default userReducer;
