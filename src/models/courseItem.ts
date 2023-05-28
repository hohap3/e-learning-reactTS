export type UserTypeCode = "GV" | "HV" | "";
export type UserTypeName = "Giáo vụ" | "Học viên";

export interface CourseCategory {
  maDanhMucKhoahoc: string;
  tenDanhMucKhoaHoc: string;
}

export interface AdminCreate {
  taiKhoan: string;
  hoTen: string;
  maLoaiNguoiDung: UserTypeCode;
  tenLoaiNguoiDung: UserTypeName;
}

export interface CourseItem {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: 0;
  nguoiTao: AdminCreate;
  danhMucKhoaHoc: CourseCategory;
  maDanhMucKhoahoc?: string;
}

export interface CourseItemRegister {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  ngayTao: string;
  danhGia: number;
}
