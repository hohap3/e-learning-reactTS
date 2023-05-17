import * as yup from "yup";
import { FULL_NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX } from "../../constants";

const updateAdminSchema = yup.object({
  hoTen: yup
    .string()
    .required("Please insert this field!")
    .matches(FULL_NAME_REGEX, "Full name must be characters only!"),
  matKhau: yup
    .string()
    .required("Please insert this field!")
    .matches(
      PASSWORD_REGEX,
      "Password must have at least one uppercase , one lowercase , one number and one special letter.Password length must be higher or equal to 8 letter!"
    ),
  nhapLaiMatKhau: yup
    .string()
    .required("Please insert this field!")
    .oneOf([yup.ref("matKhau")], "Retype password is not match! Try again!"),
  email: yup
    .string()
    .required("Please insert this field!")
    .email("Email is not valid! Email must be xx@xx.com"),
  soDT: yup
    .string()
    .required("Please insert this field!")
    .matches(
      PHONE_REGEX,
      "Phone number must have 10 numbers and doesn't have any letter"
    ),
  maLoaiNguoiDung: yup
    .string()
    .oneOf(["GV", "HV"], "Please select one of user type"),
  maNhom: yup
    .string()
    .test(
      "if-user-didn't select",
      "Please select one of group types",
      (value) => !!value
    ),
});

export default updateAdminSchema;
