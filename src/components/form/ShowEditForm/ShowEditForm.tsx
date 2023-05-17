import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UserInfo, UserTypeProps } from "../../../models";
import InputField from "../form-control/InputField";

import axios from "axios";
import Swal from "sweetalert2";
import { ToastType } from "../../../constants";
import { toastMessage } from "../../../utils";
import clsx from "clsx";

import SelectField from "../form-control/SelectField";
import { useEffect, useState } from "react";
import userApi from "api/userAPI";
import { GROUP_LIST } from "constants/common";

interface Props {
  initialValues: UserInfo;
  isEditMode: boolean;
  onSubmitEdit: (formValues: UserInfo) => void;
  isAdmin: boolean;
  formSchema: any;
}

function ShowEditForm({
  initialValues,
  isEditMode,
  onSubmitEdit,
  isAdmin,
  formSchema,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserInfo>({
    defaultValues: initialValues,
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const [userTypeList, setUserTypeList] = useState<UserTypeProps[]>([]);

  useEffect(() => {
    (async () => {
      if (!isAdmin) return;

      const res: UserTypeProps[] = await userApi.getUserType();

      setUserTypeList(res);
    })();
  }, [isAdmin]);

  async function handleSubmitEditForm(formValues: UserInfo) {
    if (!onSubmitEdit) return;
    try {
      await onSubmitEdit(formValues);
    } catch (error) {
      if (!axios.isAxiosError(error)) return;
      console.log(error.response);

      Swal.fire({
        title: `Oops..Something wrong!`,
        text: error.response?.data ? `${error.response.data}` : "",
        icon: "error",
      });

      const errorMessage = toastMessage(
        error.response?.statusText ? `${error.response.statusText}` : "",
        ToastType.ERROR
      );
      errorMessage();
    }
  }

  function handleSubmitError(error: any) {
    if (Object.keys(error).length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please insert all field",
      });
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitEditForm, handleSubmitError)}>
      {(isAdmin || !isAdmin) && !isEditMode && (
        <InputField
          name="taiKhoan"
          control={control}
          label="Account"
          variant="standard"
          readOnly={!isEditMode}
        />
      )}

      <InputField
        name="hoTen"
        label="Full name"
        control={control}
        readOnly={!isEditMode}
        variant={isEditMode ? "outlined" : "standard"}
        placeholder="Insert your full name"
      />

      <InputField
        name="soDT"
        control={control}
        label="Phone"
        variant={isEditMode ? "outlined" : "standard"}
        readOnly={!isEditMode}
        placeholder="Insert phone number"
      />

      <InputField
        name="email"
        control={control}
        label="Email"
        variant={isEditMode ? "outlined" : "standard"}
        readOnly={!isEditMode}
      />

      {(!isAdmin || isAdmin) && isEditMode && (
        <InputField
          name="matKhau"
          label="New Password"
          control={control}
          type="password"
          placeholder="Insert your new password"
        />
      )}

      {(!isAdmin || isAdmin) && isEditMode && (
        <InputField
          name="nhapLaiMatKhau"
          label="Retype Password"
          control={control}
          type="password"
          placeholder="Insert your password again!"
        />
      )}

      {isAdmin && (
        <SelectField
          name="maLoaiNguoiDung"
          control={control}
          label="User Type"
          disabled={!isEditMode}
          variant={isEditMode ? "outlined" : "standard"}
          data={userTypeList}
        />
      )}

      {isAdmin && (
        <SelectField
          name="maNhom"
          control={control}
          label="User Group"
          disabled={!isEditMode}
          variant={isEditMode ? "outlined" : "standard"}
          data={GROUP_LIST}
        />
      )}

      {isEditMode && (
        <button
          disabled={isSubmitting}
          type="submit"
          title="Save your info!"
          className={clsx(`py-2 px-6 rounded text-white`, {
            ["w-full"]: isAdmin,
            ["bg-blue-600"]: isAdmin,
            ["bg-[#06bbcc]"]: !isAdmin,
            ["hover:bg-[#2bc5d4]"]: !isAdmin,
          })}
        >
          Save
        </button>
      )}
    </form>
  );
}

export default ShowEditForm;
