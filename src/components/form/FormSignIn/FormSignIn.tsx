import { yupResolver } from "@hookform/resolvers/yup";
import userApi from "api/userAPI";
import { useAppDispatch } from "app/hooks";
import { ACCESS_TOKEN, ADMIN_TOKEN, IS_ADMIN } from "constants/common";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { userAction } from "redux/User/userSlice";
import Swal from "sweetalert2";
import { ToastType } from "../../../constants";
import {
  CourseItem,
  ListResponseAccount,
  SignInParams,
  UserSignIn,
} from "../../../models";
import { signInSchema } from "../../../schemas";
import { saveLocalStorage, toastMessage } from "../../../utils";
import InputField from "../form-control/InputField";

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

  function submitErrorHandler(error: any) {
    if (Object.keys(error).length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please insert all field",
      });
      return;
    }
  }

  async function handleSignIn(formValues: SignInParams) {
    try {
      const res: UserSignIn = await userApi.signIn(formValues);
      const { accessToken } = res;

      // save Localstorage
      saveLocalStorage(ACCESS_TOKEN, accessToken);
      const secondRes: ListResponseAccount<CourseItem> =
        await userApi.getUserInfo();

      const { matKhau, chiTietKhoaHocGhiDanh, ...restResponse } = secondRes;
      const { maLoaiNguoiDung } = restResponse;
      if (maLoaiNguoiDung === "GV") {
        saveLocalStorage(ADMIN_TOKEN, accessToken);
        localStorage.removeItem(ACCESS_TOKEN);
        saveLocalStorage(IS_ADMIN, true);
      }

      dispatch(
        userAction.fetchLogin({
          chiTietKhoaHocGhiDanh,
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
    <form onSubmit={handleSubmit(handleSignIn, submitErrorHandler)}>
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
