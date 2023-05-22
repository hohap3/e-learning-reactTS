import { Backdrop } from "@mui/material";
import userApi from "api/userAPI";
import axios, { AxiosError } from "axios";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";
import AddNewUserForm from "components/form/admin/AddNewUserForm/AddNewUserForm";
import { ToastType } from "constants/index";
import { UserCreate } from "models/index";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserSchema } from "schemas/index";
import { toastMessage } from "utils/index";

function AdminAddUserPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const initialValues: UserCreate = {
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: "",
    maNhom: "",
    email: "",
  };

  async function handleSubmitForm(formValues: UserCreate) {
    setLoading(true);

    setTimeout(async () => {
      try {
        await userApi.createNewUser(formValues);

        const successMessage = toastMessage(
          "Create User Successfully",
          ToastType.SUCCESS
        );
        successMessage();
        setLoading(false);
        navigate("/admin/user-list");
      } catch (error: any | AxiosError) {
        console.log(error);

        if (axios.isAxiosError(error)) {
          const errorMessage = toastMessage(
            error.response?.data,
            ToastType.ERROR
          );
          errorMessage();
        }
      }

      setLoading(false);
    }, 500);
  }

  return (
    <section className="bg-white py-8 px-4 rounded-md">
      <h2 className="capitalize text-2xl text-center">Add new User</h2>

      <div className="my-8">
        <AddNewUserForm
          initialValues={initialValues}
          onSubmitForm={handleSubmitForm}
          formSchema={addUserSchema}
        />
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <LoadingCircle />
      </Backdrop>
    </section>
  );
}

export default AdminAddUserPage;
