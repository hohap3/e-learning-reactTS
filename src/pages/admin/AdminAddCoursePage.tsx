import courseAPI from "api/courseAPI";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import axios, { AxiosError } from "axios";
import AddNewCourseForm from "components/form/admin/AddNewCourseForm/AddEditCourseForm";
import { COURSE_PROP_LIST } from "constants/common";
import { ToastType } from "constants/index";
import AdminLayoutPage from "layouts/admin/adminLayoutPage/AdminLayoutPage";
import { CourseProps, CoursePropsMap } from "models/index";
import React, { useEffect, useState } from "react";
import { courseAction } from "redux/Course/courseSlice";
import { addEditCourseSchema } from "schemas/index";
import { getCurrentDate, toastMessage } from "utils/index";

function AdminAddCoursePage() {
  const loginInfo = useAppSelector((state: RootState) => state.user.loginInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(courseAction.fetchCourse());
  }, []);

  const initialValues: CourseProps = {
    maKhoaHoc: "",
    biDanh: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    maDanhMucKhoaHoc: "",
    danhGia: 0,
    hinhAnh: "",
    maNhom: "",
    ngayTao: getCurrentDate(),
    hinhAnhFile: "",
    taiKhoanNguoiTao: `${loginInfo.taiKhoan}`,
  };

  async function handleSubmitForm(formValues: CourseProps) {
    const { name } = formValues.hinhAnhFile;

    const formData = new FormData();

    formData.append("file", formValues.hinhAnhFile);
    formData.append("tenKhoaHoc", formValues.tenKhoaHoc);

    const mapFormValues: CoursePropsMap = {
      ...formValues,
      hinhAnh: name,
    };

    for (const key of Object.keys(mapFormValues)) {
      if (!COURSE_PROP_LIST.includes(key))
        delete mapFormValues[key as keyof CoursePropsMap];
    }

    setLoading(true);
    setTimeout(async () => {
      try {
        await courseAPI.createCourse(mapFormValues);
        await courseAPI.uploadCourseImage(formData);

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
          formSchema={addEditCourseSchema}
          isEdit={false}
        />
      </div>
    </AdminLayoutPage>
  );
}

export default AdminAddCoursePage;
