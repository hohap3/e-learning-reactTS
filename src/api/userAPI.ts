import { ACCESS_TOKEN, COURSE_GROUP } from "constants/common";
import {
  CourseItem,
  ListResponseAccount,
  ResponseUpdateUserInfo,
  SignInParams,
  UpdateInfoProps,
  UserSignIn,
  UserSignUp,
} from "../models";
import axiosClient from "./axiosClient";
import { getLocalStorageData } from "../utils";

const userApi = {
  signIn(data: SignInParams): Promise<UserSignIn> {
    const url = "QuanLyNguoiDung/DangNhap";
    return axiosClient.post(url, data);
  },

  signUp(data: UserSignUp) {
    const url = `QuanLyNguoiDung/DangKy`;
    return axiosClient.post(url, data);
  },

  getUserList() {
    const url = `QuanLyNguoiDung/LayDanhSachNguoiDung`;
    return axiosClient.get(url, {
      params: {
        MaNhom: COURSE_GROUP,
      },
    });
  },

  getUserInfo(): Promise<ListResponseAccount<CourseItem>> {
    const url = `/QuanLyNguoiDung/ThongTinNguoiDung`;
    const accessToken = getLocalStorageData(ACCESS_TOKEN);

    return axiosClient.post(url, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  updateUserInfo(data: UpdateInfoProps): Promise<ResponseUpdateUserInfo> {
    const url = `QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
    const accessToken = getLocalStorageData(ACCESS_TOKEN);

    return axiosClient.put(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default userApi;
