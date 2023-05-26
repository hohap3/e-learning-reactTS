import { ACCESS_TOKEN, ADMIN_TOKEN, COURSE_GROUP } from "constants/common";
import axiosClient from "./axiosClient";
import {
  Category,
  CourseItem,
  CourseRegister,
  CreateCourse,
  ListParams,
  ListResponse,
  UnregisterCourse,
} from "../models";
import { getLocalStorageData } from "../utils";

const courseAPI = {
  getAllCourseCategory(): Promise<Category[]> {
    const url = `QuanLyKhoaHoc/LayDanhMucKhoaHoc`;
    return axiosClient.get(url);
  },

  getCourseByCategory(categoryName: string): Promise<CourseItem[]> {
    const url = `QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc`;
    return axiosClient.get(url, {
      params: {
        maDanhMuc: categoryName,
        MaNhom: COURSE_GROUP,
      },
    });
  },

  getCourseListByPage(params: ListParams): Promise<ListResponse<CourseItem>> {
    const url = `QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang`;
    return axiosClient.get(url, { params });
  },

  getCourseInfo(courseId: string): Promise<CourseItem> {
    const url = `QuanLyKhoaHoc/LayThongTinKhoaHoc`;
    return axiosClient.get(url, {
      params: {
        maKhoaHoc: courseId,
      },
    });
  },

  registerCourse(data: Partial<CourseRegister>) {
    const url = `QuanLyKhoaHoc/DangKyKhoaHoc`;
    const accessToken =
      getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);

    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getAllCourse(params: ListParams): Promise<CourseItem[]> {
    const url = `QuanLyKhoaHoc/LayDanhSachKhoaHoc`;
    return axiosClient.get(url, { params });
  },

  unregisterCourse(data: UnregisterCourse): Promise<string> {
    const url = `QuanLyKhoaHoc/HuyGhiDanh`;
    const accessToken =
      getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  createCourse(data: CreateCourse) {
    const url = `QuanLyKhoaHoc/ThemKhoaHoc`;
    const accessToken =
      getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  removeCourse(courseId: string): Promise<string> {
    const url = `QuanLyKhoaHoc/XoaKhoaHoc`;
    const adminToken = getLocalStorageData(ADMIN_TOKEN);
    return axiosClient.delete(url, {
      params: {
        MaKhoaHoc: courseId,
      },
      headers: { Authorization: `Bearer ${adminToken}` },
    });
  },

  registerCourseByAdmin(data: CourseRegister): Promise<string> {
    const url = `QuanLyKhoaHoc/GhiDanhKhoaHoc`;
    const adminToken = getLocalStorageData(ADMIN_TOKEN);

    return axiosClient.post(url, data, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
  },
};

export default courseAPI;
