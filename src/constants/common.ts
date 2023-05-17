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

export const GROUP_LIST = [
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
];

export const IS_ADMIN = "IS_ADMIN";
