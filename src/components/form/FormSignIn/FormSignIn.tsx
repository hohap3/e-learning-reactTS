import { yupResolver } from "@hookform/resolvers/yup";
import userApi from "api/userAPI";
import { useAppDispatch } from "app/hooks";
import { ToastType } from "../../../constants";
import { ACCESS_TOKEN, COURSE_GROUP } from "constants/common";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { userAction } from "redux/User/userSlice";
import Swal from "sweetalert2";
import {
  CourseItem,
  CourseItemRegister,
  ListResponse,
  ListResponseAccount,
  SignInParams,
  UserSignIn,
} from "../../../models";
import { signInSchema } from "../../../schemas";
import { saveLocalStorage, toastMessage } from "../../../utils";
import InputField from "../form-control/InputField";
import courseAPI from "api/courseAPI";

function FormSignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignInParams>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    mode: "all",
    resolver: yupResolver(signInSchema),
  });

  async function handleSignIn(formValues: SignInParams) {
    try {
      const res: UserSignIn = await userApi.signIn(formValues);
      const res2: CourseItem[] = await courseAPI.getAllCourse({
        MaNhom: COURSE_GROUP,
      });

      const { accessToken } = res;

      // save Localstorage
      saveLocalStorage(ACCESS_TOKEN, accessToken);
      const secondRes: ListResponseAccount<CourseItem> =
        await userApi.getUserInfo();

      console.log(secondRes);

      const { matKhau, chiTietKhoaHocGhiDanh, ...restResponse } = secondRes;

      const courseListUserRegisterd = res2.filter((course) =>
        chiTietKhoaHocGhiDanh.some((x) => x.maKhoaHoc === course.maKhoaHoc)
      );

      dispatch(
        userAction.fetchLogin({
          chiTietKhoaHocGhiDanh: courseListUserRegisterd,
          ...restResponse,
        })
      );
      const successMessage = toastMessage(
        "Sign in successfully!",
        ToastType.SUCCESS
      );
      successMessage();

      navigate("/");
    } catch (error: any) {
      dispatch(userAction.fetchLoginFailed());
      const { status, data } = error.response;
      Swal.fire({
        icon: "error",
        title: "Oops...Something wrong!",
        text: `${data}`,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn, (error) => console.log(error))}>
      <InputField
        name="taiKhoan"
        control={control}
        label="Account"
        placeholder="User Account"
      />

      <InputField
        name="matKhau"
        control={control}
        label="Password"
        placeholder="User Password"
        type="password"
      />

      <div className="text-center">
        <button
          type="submit"
          className="text-white py-2 px-8 bg-[#06bbcc] rounded hover:bg-[#2bc5d4] transition-all w-full"
          disabled={isSubmitting}
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

export default FormSignIn;
