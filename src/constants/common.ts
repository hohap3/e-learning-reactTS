import backEnd from "assets/categories/back-end-developer.png";
import webDesign from "assets/categories/web-design.jpg";
import mobileDevelopment from "assets/categories/mobile-development.jpeg";
import frontEnd from "assets/categories/Frontend-Developer.jpeg";
import fullStack from "assets/categories/full-stack.png";
import algorithm from "assets/categories/algorithm.jpg";
import student1 from "assets/student/testimonial-1.jpg";
import student2 from "assets/student/testimonial-2.jpg";
import student3 from "assets/student/testimonial-3.jpg";
import student4 from "assets/student/testimonial-4.jpg";
import { GROUP_ITEM } from "models/index";

export const COURSE_GROUP = "GP01";
export const categoryImage = [
  { image: backEnd },
  { image: webDesign },
  { image: mobileDevelopment },
  { image: frontEnd },
  { image: fullStack },
  { image: algorithm },
];

export const studentImage = [
  { image: student1 },
  { image: student2 },
  { image: student3 },
  { image: student4 },
];

export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const ADMIN_TOKEN = "ADMIN_TOKEN";

export const SignUpProps = [
  "email",
  "hoTen",
  "maNhom",
  "matKhau",
  "soDT",
  "taiKhoan",
];

export const UpdateInfoProps = [
  "taiKhoan",
  "matKhau",
  "hoTen",
  "soDT",
  "maLoaiNguoiDung",
  "maNhom",
  "email",
];

export const GROUP_LIST: GROUP_ITEM[] = [
  {
    key: "GP01",
    value: "GP01",
  },
  {
    key: "GP02",
    value: "GP02",
  },
  {
    key: "GP03",
    value: "GP03",
  },
  {
    key: "GP04",
    value: "GP04",
  },

  {
    key: "GP05",
    value: "GP05",
  },

  {
    key: "GP06",
    value: "GP06",
  },

  {
    key: "GP07",
    value: "GP07",
  },

  {
    key: "GP08",
    value: "GP08",
  },

  {
    key: "GP09",
    value: "GP09",
  },

  {
    key: "GP10",
    value: "GP10",
  },

  {
    key: "GP11",
    value: "GP11",
  },

  {
    key: "GP12",
    value: "GP12",
  },

  {
    key: "GP13",
    value: "GP13",
  },

  {
    key: "GP14",
    value: "GP14",
  },

  {
    key: "GP15",
    value: "GP15",
  },
];

export const IS_ADMIN = "IS_ADMIN";
export const MAX_IMAGE_SIZE = 1024 * 1024;
export const SUPPORT_FORMATS_IMAGE = ["image/jpg", "image/jpeg", "image/png"];
