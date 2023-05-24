import courseAPI from "api/courseAPI";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import axios, { AxiosError } from "axios";
import AddNewCourseForm from "components/form/admin/AddNewCourseForm/AddNewCourseForm";
import { ToastType } from "constants";
import AdminLayoutPage from "layouts/admin/adminLayoutPage/AdminLayoutPage";
import { CreateCourse } from "models/index";
import React, { useEffect, useState } from "react";
import { courseAction } from "redux/Course/courseSlice";
import { addCourseSchema } from "schemas/index";
import { getCurrentDate, toastMessage } from "utils/index";

function AdminAddCoursePage() {
  const loginInfo = useAppSelector((state: RootState) => state.user.loginInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(courseAction.fetchCourse());
  }, []);

  const initialValues: CreateCourse = {
    maKhoaHoc: "",
    biDanh: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    danhGia: 0,
    hinhAnh: "",
    maNhom: "",
    ngayTao: getCurrentDate(),
    maDanhMucKhoaHoc: "",
    taiKhoanNguoiTao: `${loginInfo.taiKhoan}`,
  };

  async function handleSubmitForm(formValues: CreateCourse) {
    setLoading(true);
    setTimeout(async () => {
      try {
        await courseAPI.createCourse(formValues);

        const successMessage = toastMessage(
          "Add new course successfully",
          ToastType.SUCCESS
        );
        successMessage();

        setLoading(false);
      } catch (error: any | AxiosError) {
        setLoading(false);

        if (axios.isAxiosError(error)) {
          const errorMessage = toastMessage(
            `${error.response?.data}`,
            ToastType.ERROR
          );
          errorMessage();
        }
      }
    }, 500);
  }

  return (
    <AdminLayoutPage title="Add Course">
      <div>
        <AddNewCourseForm
          initialValues={initialValues}
          onSubmitCourse={handleSubmitForm}
          formSchema={addCourseSchema}
        />
      </div>
    </AdminLayoutPage>
  );
}

export default AdminAddCoursePage;
