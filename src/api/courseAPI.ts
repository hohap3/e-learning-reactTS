import { ACCESS_TOKEN, COURSE_GROUP } from "constants/common";
import axiosClient from "./axiosClient";
import {
  CourseItem,
  CourseRegister,
  ListParams,
  UnregisterCourse,
} from "../models";
import { getLocalStorageData } from "../utils";

const courseAPI = {
  getAllCourseCategory() {
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

  getCourseListByPage(params: ListParams) {
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
    const accessToken = getLocalStorageData(ACCESS_TOKEN);

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
    const accessToken = getLocalStorageData(ACCESS_TOKEN);
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default courseAPI;
