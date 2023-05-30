import { FULL_NAME_REGEX, PHONE_REGEX } from "../../constants";
import * as yup from "yup";

export const updateUserAdminSchema = yup.object({
  hoTen: yup
    .string()
    .required("Please insert this field!")
    .matches(FULL_NAME_REGEX, "Full name must be characters only!"),
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
