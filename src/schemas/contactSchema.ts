import { FULL_NAME_REGEX } from "../constants";
import * as yup from "yup";

export const contactSchema = yup.object({
  userName: yup
    .string()
    .required("Please insert this field!")
    .matches(FULL_NAME_REGEX, "Your name must not have numbers in it!"),
  userEmail: yup
    .string()
    .required("Please insert this field!")
    .email("Email is not have correct email type!Email must be like xx@xx.com"),
  userDescription: yup.string().required("Please insert this field!"),
});
