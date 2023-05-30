import { Backdrop, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import ShowEditForm from "components/form/ShowEditForm/ShowEditForm";
import {
  CourseItem,
  ListResponseAccount,
  ResponseUpdateUserInfo,
  UserInfo,
} from "../models";
import React, { useState } from "react";
import { selectLoginInfo, userAction } from "redux/User/userSlice";
import { UpdateInfoProps } from "constants/common";
import userApi from "api/userAPI";
import { toastMessage } from "../utils";
import { ToastType } from "../constants";
import updateUserSchema from "schemas/updateSchema";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";

function PersonalMainPage() {
  const loginInfo = useAppSelector(selectLoginInfo);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    chiTietKhoaHocGhiDanh,
    matKhau,

    ...loginRestInfo
  } = loginInfo;

  function handleChangeEditMode() {
    setEditMode((prevState) => !prevState);
  }

  const initialValues: UserInfo = {
    taiKhoan: "",
    matKhau: "",
    nhapLaiMatKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: "HV",
    maNhom: "",
    email: "",
    ...loginRestInfo,
  };

  async function handleSubmitForm(formValues: UserInfo) {
    setLoading(true);
    setTimeout(async () => {
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
          soDT: restResponse.soDt,
        };

        dispatch(
          userAction.fetchLogin(
            newUpdateValue as ListResponseAccount<CourseItem>
          )
        );

        const successMessage = toastMessage(
          "Update successfully",
          ToastType.SUCCESS
        );

        successMessage();
        setLoading(false);
        setEditMode(false);
      } catch (error) {
        console.log(error);
      }
    }, 500);
  }

  return (
    <div>
      <h2 className="capitalize text-xl">Your personal's information</h2>

      <div className="mb-6">
        <FormGroup>
          <FormControlLabel
            label={`${
              editMode ? "Show your information!" : "Update your information!"
            } `}
            control={
              <Switch checked={editMode} onChange={handleChangeEditMode} />
            }
          />
        </FormGroup>
      </div>

      <div>
        <ShowEditForm
          isAdmin={false}
          initialValues={initialValues}
          isEditMode={editMode}
          onSubmitEdit={handleSubmitForm}
          formSchema={updateUserSchema}
          allowUpdatePassword={true}
        />
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <LoadingCircle />
      </Backdrop>
    </div>
  );
}

export default PersonalMainPage;
