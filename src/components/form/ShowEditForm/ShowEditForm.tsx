import { UserInfo } from "../../../models";
import React from "react";
import InputField from "../form-control/InputField";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import updateUserSchema from "schemas/updateSchema";

import axios from "axios";
import { toastMessage } from "../../../utils";
import { ToastType } from "../../../constants";
import Swal from "sweetalert2";

interface Props {
  initialValues: UserInfo;
  isEditMode: boolean;
  onSubmitEdit: (formValues: UserInfo) => void;
}

function ShowEditForm({ initialValues, isEditMode, onSubmitEdit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserInfo>({
    defaultValues: initialValues,
    mode: "all",
    resolver: yupResolver(updateUserSchema),
  });

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

  return (
    <form
      onSubmit={handleSubmit(handleSubmitEditForm, (error) =>
        console.log(error)
      )}
    >
      {!isEditMode && (
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

      {isEditMode && (
        <InputField
          name="matKhau"
          label="New Password"
          control={control}
          type="password"
          placeholder="Insert your new password"
        />
      )}

      {isEditMode && (
        <InputField
          name="nhapLaiMatKhau"
          label="Retype Password"
          control={control}
          type="password"
          placeholder="Insert your password again!"
        />
      )}

      {isEditMode && (
        <button
          disabled={isSubmitting}
          type="submit"
          title="Save your info!"
          className="py-2 px-6 bg-[#06bbcc] rounded text-white hover:bg-[#2bc5d4]"
        >
          Save
        </button>
      )}
    </form>
  );
}

export default ShowEditForm;
