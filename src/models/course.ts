export * from "./courseRegister";
export * from "./courseItem";

export interface UnregisterCourse {
  maKhoaHoc: string;
  taiKhoan: string;
}

export interface CreateCourse {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  danhGia: number | string;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
}

export interface CourseListMapTable {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  moTa: string;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  taiKhoan: string;
  maDanhMucKhoahoc: string;
}
