import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import ShowEditForm from "components/form/ShowEditForm/ShowEditForm";
import {
  CourseItem,
  ListResponseAccount,
  ResponseUpdateUserInfo,
  UserInfo,
} from "../../models";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectLoginInfo } from "redux/User/userSlice";
import updateAdminSchema from "schemas/admin/updateAdminSchema";
import { UpdateInfoProps } from "constants/common";
import userApi from "api/userAPI";
import { userAction } from "redux/User/userSlice";
import { toastMessage } from "../../utils";
import { ToastType } from "../../constants";

function AdminInfoPage() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const loginInfo = useAppSelector(selectLoginInfo);
  const dispatch = useAppDispatch();

  const { chiTietKhoaHocGhiDanh, matKhau, ...restLoginInfo } = loginInfo;

  const initialValues: UserInfo = {
    taiKhoan: "",
    matKhau: "",
    nhapLaiMatKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: "HV",
    maNhom: "",
    email: "",
    ...restLoginInfo,
  };

  function handleChangeEditMode() {
    setEditMode((prevState) => !prevState);
  }

  async function handleSubmitEditForm(formValues: UserInfo) {
    try {
      const formValuesMap: UserInfo = { ...formValues };
      for (const key of Object.keys(formValues)) {
        if (!UpdateInfoProps.includes(key))
          delete formValuesMap[key as keyof UserInfo];
      }
      const res: ResponseUpdateUserInfo = await userApi.updateUserInfo(
        formValuesMap
      );
      const {
        biDanh,
        maLoaiNguoiDungNavigation,
        hocVienKhoaHoc,
        khoaHoc,
        matKhau,
        ...restResponse
      } = res;
      const newUpdateValue = {
        chiTietKhoaHocGhiDanh,
        ...restResponse,
      };
      dispatch(
        userAction.fetchLogin(newUpdateValue as ListResponseAccount<CourseItem>)
      );

      const successMessage = toastMessage(
        "Update successfully",
        ToastType.SUCCESS
      );

      successMessage();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="bg-white py-2 px-4">
      <h2 className="text-center uppercase text-2xl mb-6">
        User's Information
      </h2>

      <div className="mb-4">
        <FormGroup>
          <FormControlLabel
            label={`${
              !editMode ? "Show your information!" : "Update your information!"
            } `}
            control={
              <Switch checked={editMode} onChange={handleChangeEditMode} />
            }
          />
        </FormGroup>
      </div>

      <ShowEditForm
        isAdmin={true}
        initialValues={initialValues}
        isEditMode={editMode}
        onSubmitEdit={handleSubmitEditForm}
        formSchema={updateAdminSchema}
      />
    </section>
  );
}

export default AdminInfoPage;
