import { useAppDispatch, useAppSelector } from "app/hooks";
import DrawerModel from "components/Drawer/DrawerModel";
import AdminUserListTable, {
  DataUpdate,
} from "components/admin/AdminUserListTable/AdminUserListTable";

import userApi from "api/userAPI";
import axios, { AxiosError } from "axios";
import ShowEditForm from "components/form/ShowEditForm/ShowEditForm";
import { GROUP_LIST, UpdateInfoProps } from "constants/common";
import { useSearchParams } from "react-router-dom";
import { selectUserInfo, userAction } from "redux/User/userSlice";
import { updateUserAdminSchema } from "schemas/admin/updateUserAdminSchema";
import { ToastType } from "../../constants";
import { UserInfo } from "../../models";
import { toastMessage } from "../../utils";
import { useState } from "react";
import { Backdrop } from "@mui/material";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";
import AdminLayoutPage from "layouts/admin/adminLayoutPage/AdminLayoutPage";

function AdminUserListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const userInformation = useAppSelector(selectUserInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const initialValues: UserInfo = {
    taiKhoan: "",
    email: "",
    hoTen: "",
    matKhau: "",
    maLoaiNguoiDung: "",
    nhapLaiMatKhau: `${userInformation?.matKhau}`,
    maNhom: `${searchParams.get("group")}`,
    soDT: "",
    ...userInformation,
  };

  function handleSelectGroup(group: string) {
    setSearchParams({ group });
  }

  function handleGetUserInfo(data: DataUpdate) {
    dispatch(
      userAction.fetchUserInfoProps({
        MaNhom: data.group,
        tuKhoa: data.account,
      })
    );
  }

  function handleCloseDrawer() {
    dispatch(userAction.resetUserInfo());
  }

  async function handleSubmitEdit(formValues: UserInfo) {
    const mapFormValues = { ...formValues };
    for (const key of Object.keys(mapFormValues)) {
      if (!UpdateInfoProps.includes(key))
        delete mapFormValues[key as keyof UserInfo];
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        await userApi.updateUserInfo(mapFormValues);
        const successMessage = toastMessage(
          "Update successfully",
          ToastType.SUCCESS
        );
        successMessage();

        setLoading(false);
      } catch (error: any | AxiosError) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          const failedMessage = toastMessage(
            `${error.response?.data}`,
            ToastType.ERROR
          );
          failedMessage();
        }
      }
    }, 500);
  }

  return (
    <AdminLayoutPage
      title={!searchParams.get("group") ? "Select one of groups below" : ""}
    >
      <div className="my-4">
        {!searchParams.get("group") && (
          <div className="grid grid-cols-2 gap-4">
            {GROUP_LIST.map((group) => (
              <div key={group.key} className="col-span-1">
                <button
                  className="h-[4rem] text-[16px] w-full relative border border-[#0868FD] text-black rounded-2xl"
                  onClick={() => handleSelectGroup(group.value)}
                >
                  {group.value}
                </button>
              </div>
            ))}
          </div>
        )}
        {searchParams.get("group") && (
          <>
            <AdminUserListTable
              group={searchParams.get("group")}
              onEdit={handleGetUserInfo}
            />
          </>
        )}

        <DrawerModel
          openDrawer={!!userInformation}
          title="Edit User"
          onClose={handleCloseDrawer}
          children={
            <ShowEditForm
              initialValues={initialValues}
              isEditMode={true}
              isAdmin={true}
              allowUpdatePassword={false}
              onSubmitEdit={handleSubmitEdit}
              formSchema={updateUserAdminSchema}
            />
          }
        />

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <LoadingCircle />
        </Backdrop>
      </div>
    </AdminLayoutPage>
  );
}

export default AdminUserListPage;
