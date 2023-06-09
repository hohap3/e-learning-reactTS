import { ACCESS_TOKEN, ADMIN_TOKEN, COURSE_GROUP } from "constants/common";
import {
  CourseItem,
  ListParams,
  ListResponse,
  ListResponseAccount,
  ResponseUpdateUserInfo,
  SignInParams,
  UpdateInfoProps,
  UserCreate,
  UserHadRegister,
  UserInfoDetail,
  UserProps,
  UserSignIn,
  UserSignUp,
  UserTypeProps,
} from "../models";
import { getLocalStorageData } from "../utils";
import { CourseWaitingProps } from "./../models/courseItem";
import axiosClient from "./axiosClient";

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
    const accessToken =
      getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);

    return axiosClient.post(url, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  updateUserInfo(data: UpdateInfoProps): Promise<ResponseUpdateUserInfo> {
    const url = `QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
    const accessToken =
      getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);

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

    const accessToken =
      getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);

    return axiosClient.delete(url, {
      params: {
        TaiKhoan: account,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  findUserDetail(params: ListParams): Promise<ListResponse<UserProps>> {
    const url = `QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang`;
    return axiosClient.get(url, {
      params,
    });
  },

  findUserMoreDetail(params: ListParams): Promise<UserInfoDetail[]> {
    const url = `QuanLyNguoiDung/TimKiemNguoiDung`;
    return axiosClient.get(url, { params });
  },

  createNewUser(data: UserCreate) {
    const url = `QuanLyNguoiDung/ThemNguoiDung`;
    const accessToken =
      getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);

    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getUserRegisteredList(courseId: string): Promise<UserHadRegister[]> {
    const url = `QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`;
    const accessToken =
      getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);

    return axiosClient.post(
      url,
      { MaKhoaHoc: courseId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  getUserWaitingList(courseId: string): Promise<UserHadRegister[]> {
    const url = `QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`;
    const accessToken =
      getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);

    return axiosClient.post(
      url,
      { MaKhoaHoc: courseId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  getWaitingCourse(account: string): Promise<CourseWaitingProps[]> {
    const url = `QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`;
    const accessToken =
      getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);
    return axiosClient.post(
      url,
      { taiKhoan: account },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
};

export default userApi;
