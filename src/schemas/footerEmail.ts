import * as yup from "yup";

export const footerEmailSchema = yup.object({
  email: yup
    .string()
    .required("Please insert this field!")
    .email("Email is not valid! Email must be xxx@xxx.com"),
});
