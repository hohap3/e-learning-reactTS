import { UserTypeCode, UserTypeName } from "./courseItem";

export interface SignInParams {
  taiKhoan: string;
  matKhau: string;
}

export interface SignUpParams {
  taiKhoan: string;
  matKhau: string;
  nhapLaiMatKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
  hasAgree: boolean;
}

export interface UpdateInfoParams {
  taiKhoan: string;
  matKhau: string;
  nhapLaiMatKhau?: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
}

export interface UserSignUp {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
}

export interface User {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: UserTypeCode;
}

export interface UserSignIn {
  taiKhoan: string;
  email: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: UserTypeCode;
  accessToken?: string;
}

export interface UserInfo extends UpdateInfoParams {
  maLoaiNguoiDung: UserTypeCode;
}

export interface UpdateInfoProps {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

export interface ResponseUpdateUserInfo extends UpdateInfoProps {
  soDt: string;
  biDanh: null | string;
  maLoaiNguoiDungNavigation: null | string;
  hocVienKhoaHoc: [];
  khoaHoc: [];
}

export interface UserTypeProps {
  maLoaiNguoiDung: UserTypeCode;
  tenLoaiNguoiDung: UserTypeName;
}

export interface UserProps {
  taiKhoan: string;
  hoTen: string;
  soDT: string;
  maNhom: null;
  email: string;
  maLoaiNguoiDung: UserTypeCode;
  tenLoaiNguoiDung: UserTypeName;
}

export interface UserListPaginationMap {
  key: string;
  taiKhoan: string;
  hoTen: string;
  soDT: string;
  email: string;
  maLoaiNguoiDung: UserTypeCode;
}
