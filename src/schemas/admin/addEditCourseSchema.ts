import { MAX_IMAGE_SIZE, SUPPORT_FORMATS_IMAGE } from "constants/common";
import * as yup from "yup";

export const addEditCourseSchema = yup.object({
  maKhoaHoc: yup.string().required("Please insert this field"),
  biDanh: yup.string().required("Please insert this field"),
  tenKhoaHoc: yup.string().required("Please insert this field"),
  moTa: yup.string(),
  hinhAnh: yup.string().required("Please insert an image"),
  maNhom: yup
    .string()
    .test(
      "check-if-user-didnt-select",
      "Please select one of those group below",
      (value) => !!value
    ),
  maDanhMucKhoahoc: yup
    .string()
    .test(
      "check-if-user-didnt-select",
      "Please select one of those category below",
      (value) => value !== ""
    ),

  danhGia: yup
    .number()
    .test(`if-user-didn't-rating`, "Please rating course", (value) => !!value),
});
