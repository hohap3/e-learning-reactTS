import { MAX_IMAGE_SIZE, SUPPORT_FORMATS_IMAGE } from "constants/common";
import * as yup from "yup";

export const addCourseSchema = yup.object({
  maKhoaHoc: yup.string().required("Please insert this field"),
  biDanh: yup.string().required("Please insert this field"),
  tenKhoaHoc: yup.string().required("Please insert this field"),
  moTa: yup.string(),
  hinhAnh: yup.string().required("Please insert an image"),
  // .test("image-size", "Image size must be lower 11MB", (value) => {
  //   console.log();
  //   return value && (value as HTMLInputElement).size <= MAX_IMAGE_SIZE;
  // })
  // .test(
  //   "valid-format",
  //   "The file you input must be an image type (.jpg,.png,jpeg,...)",
  //   (value) =>
  //     value &&
  //     SUPPORT_FORMATS_IMAGE.includes((value as HTMLInputElement).type)
  // ),
  maNhom: yup
    .string()
    .test(
      "check-if-user-didnt-select",
      "Please select one of those group below",
      (value) => !!value
    ),
  maDanhMucKhoaHoc: yup
    .string()
    .test(
      "check-if-user-didnt-select",
      "Please select one of those category below",
      (value) => !!value
    ),

  danhGia: yup
    .number()
    .test(`if-user-didn't-rating`, "Please rating course", (value) => !!value),
});
