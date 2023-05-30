export * from "./courseRegister";
export * from "./courseItem";

export interface UnregisterCourse {
  maKhoaHoc: string;
  taiKhoan: string;
}

export interface CourseProps {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  danhGia: number | string;
  hinhAnh: string;
  hinhAnhFile: string | any;
  maNhom: string;
  ngayTao: string;
  maDanhMucKhoaHoc?: string;
  maDanhMucKhoahoc?: string;
  taiKhoanNguoiTao: string;
}

export type CoursePropsMap = Omit<CourseProps, "hinhAnhFile">;

export interface CourseListMapTable {
  maKhoaHoc: string;
  bidanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
}

export interface UserCourse {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
}
