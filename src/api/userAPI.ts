import { ACCESS_TOKEN, COURSE_GROUP } from "constants/common";
import {
  CourseItem,
  CourseItemRegister,
  ListParams,
  ListResponse,
  ListResponseAccount,
  ResponseUpdateUserInfo,
  SignInParams,
  UpdateInfoProps,
  UserProps,
  UserSignIn,
  UserSignUp,
  UserTypeProps,
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
    const url = `QuanLyNguoiDung/ThongTinNguoiDung`;
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

  getUserType(): Promise<UserTypeProps[]> {
    const url = `QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`;
    return axiosClient.get(url);
  },

  getUserListPagination(params: ListParams): Promise<ListResponse<UserProps>> {
    const url = `QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang`;
    return axiosClient.get(url, { params });
  },

  removeUserByAccount(account: string): Promise<string> {
    const url = `QuanLyNguoiDung/XoaNguoiDung`;

    const accessToken = getLocalStorageData(ACCESS_TOKEN);

    return axiosClient.delete(url, {
      params: {
        TaiKhoan: account,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default userApi;
