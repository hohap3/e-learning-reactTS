import { FC, ReactElement } from "react";
import { UserTypeCode } from "./courseItem";

export interface ListParams {
  page?: number;
  pageSize?: number;
  MaNhom?: string;
  maKhoaHoc?: string;
  maDanhMuc?: string;
  tenKhoaHoc?: string;
  tuKhoa?: string;
}

export interface Pagination {
  currentPage?: number;
  count?: number;
  totalPages?: number;
  totalCount?: number;
}

export interface ListResponse<Type> {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: Type[];
}

export interface RouteItem {
  index?: boolean;
  path?: string;
  name?: string;
  component: FC<any>;
  children?: RouteItem[];
}

export interface Route {
  path: string;
  name?: string;
  component: FC;
  children?: RouteItem[];
}

export interface ListResponseAccount<Type> {
  chiTietKhoaHocGhiDanh: Type[];
  taiKhoan: string;
  matKhau?: string;
  hoTen: string;
  maLoaiNguoiDung: UserTypeCode;
  maNhom: string;
  email: string;
  soDT: string;
}

export interface ImageDefaultSize {
  width: number | null;
  height: number | null;
}

export interface CommonStyleToast {
  position?: "top-right";
  autoClose?: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: undefined;
  theme?: "light";
}

export interface GROUP_ITEM {
  key: string;
  value: string;
}

export interface MyObject extends File {
  [key: string]: any;
}
