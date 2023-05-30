import { Backdrop } from "@mui/material";
import { ColumnsType } from "antd/es/table";
import courseAPI from "api/courseAPI";
import { useAppDispatch, useAppSelector } from "app/hooks";
import axios, { AxiosError } from "axios";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";
import AdminCourseDetail from "components/admin/AdminCourseDetail/AdminCourseDetail";
import AdminTable from "components/admin/AdminTable/AdminTable";
import { ToastType } from "constants/index";
import AdminLayoutPage from "layouts/admin/adminLayoutPage/AdminLayoutPage";
import { UserHadRegister } from "models/index";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  courseAction,
  selectCourseInfoDetail,
  selectUserRegisterList,
  selectUserWaitingList,
} from "redux/Course/courseSlice";
import Swal from "sweetalert2";
import { toastMessage } from "utils/index";

function AdminCourseDetailPage() {
  const courseInfoDetail = useAppSelector(selectCourseInfoDetail);
  const registeredUserList = useAppSelector(selectUserRegisterList);
  const waitingUserList = useAppSelector(selectUserWaitingList);
  const { courseId } = useParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!courseId) return;

    dispatch(courseAction.fetchCourseInfo(courseId));
  }, [courseId]);

  function handleUnregister(userName: string, userAccount: string) {
    if (!userName || !userAccount) return;
    Swal.fire({
      title: `Are you sure to remove student "${userName}"`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        setTimeout(async () => {
          try {
            const res = await courseAPI.unregisterCourse({
              taiKhoan: userAccount,
              maKhoaHoc: courseId ? courseId : "",
            });

            const successMessage = toastMessage(res, ToastType.SUCCESS);
            successMessage();

            Swal.fire("Removed!", `${res}`, "success");

            setLoading(false);

            dispatch(courseAction.fetchCourseInfo(courseId as string));
          } catch (error: any | AxiosError) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
              const failedMessage = toastMessage(
                error.response?.data,
                ToastType.ERROR
              );
              failedMessage();

              Swal.fire({
                icon: "error",
                title: `Oops... Can't remove user "${userName}"`,
                text: `${error.response?.data}`,
              });
            }
          }
        }, 500);
      }
    });
  }

  function handleRegister(userName: string, userAccount: string) {
    if (!userName || !userAccount) return;
    Swal.fire({
      title: `Do you want student "${userName}" registered to this course`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        setTimeout(async () => {
          try {
            const res = await courseAPI.registerCourseByAdmin({
              taiKhoan: userAccount,
              maKhoaHoc: courseId ? courseId : "",
            });

            const successMessage = toastMessage(res, ToastType.SUCCESS);
            successMessage();

            Swal.fire("Register Student Successfully!", `${res}`, "success");

            setLoading(false);

            dispatch(courseAction.fetchCourseInfo(courseId as string));
          } catch (error: any | AxiosError) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
              const failedMessage = toastMessage(
                error.response?.data,
                ToastType.ERROR
              );
              failedMessage();

              Swal.fire({
                icon: "error",
                title: `Oops... Something went wrong!`,
                text: `${error.response?.data}`,
              });
            }
          }
        }, 500);
      }
    });
  }

  const columns: ColumnsType<UserHadRegister> = [
    { title: "User Account", dataIndex: "taiKhoan", key: "taiKhoan" },
    { title: "User Alias", dataIndex: "biDanh", key: "biDanh" },
    { title: "User Name", dataIndex: "hoTen", key: "hoTen" },
  ];

  const columnsSecond: ColumnsType<UserHadRegister> = [
    { title: "User Account", dataIndex: "taiKhoan", key: "taiKhoan" },
    { title: "User Alias", dataIndex: "biDanh", key: "biDanh" },
    { title: "User Name", dataIndex: "hoTen", key: "hoTen" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: UserHadRegister) => {
        const { taiKhoan, hoTen } = record;

        return (
          <div className="flex items-center gap-4">
            <button
              title="Edit course"
              className="py-1 px-4 rounded-md bg-green-500 text-white"
              onClick={() => handleRegister(hoTen, taiKhoan)}
            >
              Register
            </button>
            <button
              title="Remove course"
              className="py-1 px-4 rounded-md bg-red-500 text-white"
              onClick={() => handleUnregister(hoTen, taiKhoan)}
            >
              Unregister
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <AdminLayoutPage title="Course's Info">
      <>
        <AdminCourseDetail courseItem={courseInfoDetail} />

        <div className="mb-6">
          <AdminTable
            columns={columnsSecond}
            dataSource={waitingUserList}
            title="User's Waiting List"
          />
        </div>

        <div className="mb-6">
          <AdminTable
            columns={columns}
            dataSource={registeredUserList}
            title="User's Registered List"
          />
        </div>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <LoadingCircle />
        </Backdrop>
      </>
    </AdminLayoutPage>
  );
}

export default AdminCourseDetailPage;
