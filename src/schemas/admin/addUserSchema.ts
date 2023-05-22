import {
  PASSWORD_REGEX,
  PHONE_REGEX,
  FULL_NAME_REGEX,
  ACCOUNT_REGEX,
} from "constants/index";

import * as yup from "yup";

export const addUserSchema = yup.object({
  taiKhoan: yup
    .string()
    .required("Please insert this field!")
    .test(
      "check-space",
      "Account name doesn't require whitespace!Try again!",
      (value) => !ACCOUNT_REGEX.test(value)
    ),
  matKhau: yup
    .string()
    .required("Please insert this field")
    .matches(
      PASSWORD_REGEX,
      "Password must have at least one uppercase , one lowercase , one digit , one special character , and minimum length is 8"
    ),

  hoTen: yup
    .string()
    .required("Please insert this field")
    .matches(FULL_NAME_REGEX, "User name must be characters only!"),
  soDT: yup
    .string()
    .required("Please insert this field")
    .matches(PHONE_REGEX, "Phone number must have 10 numbers"),
  maNhom: yup
    .string()
    .test(
      "check-if-user-didnt-select",
      "Please select one of those below",
      (value) => !!value
    ),
  email: yup
    .string()
    .required("Please insert this field!")
    .email("Email is not valid! Email must be xx@xx.com"),
  maLoaiNguoiDung: yup
    .string()
    .test(
      "check-if-user-didnt-select",
      "Please select one of those below",
      (value) => !!value
    ),
});
