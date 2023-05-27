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
  maNhom: string;
  ngayTao: string;
  maDanhMucKhoaHoc?: string;
  taiKhoanNguoiTao: string;
}

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
