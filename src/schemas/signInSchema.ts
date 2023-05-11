import * as yup from "yup";

export const signInSchema = yup.object({
  taiKhoan: yup.string().required("Please insert this field!"),
  matKhau: yup.string().required("Please insert this field!"),
});
