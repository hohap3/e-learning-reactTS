import { ColumnsType } from "antd/es/table";
import courseAPI from "api/courseAPI";
import userApi from "api/userAPI";
import axios, { AxiosError } from "axios";
import UserInfoComp from "components/UserInfoComp/UserInfoComp";
import AdminTable from "components/admin/AdminTable/AdminTable";
import { ToastType } from "constants/index";
import AdminLayoutPage from "layouts/admin/adminLayoutPage/AdminLayoutPage";
import { CourseWaitingProps, UserCourse, UserInfoDetail } from "models/index";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { courseAction } from "redux/Course/courseSlice";
import Swal from "sweetalert2";
import { toastMessage } from "utils/index";

function AdminUserDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { account } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfoDetail | null>(null);
  const [waitingCourse, setWaitingCourse] = useState<CourseWaitingProps[]>([]);

  useEffect(() => {
    if (!account) return;

    (async () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          const res = await userApi.findUserMoreDetail({
            tuKhoa: account,
            MaNhom: `${searchParams.get("group")}`,
          });

          const response = await userApi.getWaitingCourse(account);

          Promise.all([res, response]).then((results) => {
            const foundUser = results[0].find(
              (user) => user.taiKhoan === account
            );
            if (!foundUser) {
              setLoading(false);
              return;
            }

            setUserInfo(foundUser);
            setWaitingCourse(results[1]);
          });
          setLoading(false);
        } catch (error: any | AxiosError) {
          setLoading(false);
          if (axios.isAxiosError(error)) {
            console.log(error);
          }
        }
      }, 600);

      return () => {
        setUserInfo(null);
      };
    })();
  }, [account]);

  function handleVerify(
    userName: string | undefined,
    userAccount: string | undefined,
    courseId: string
  ) {
    if (!userName || !userAccount || !courseId) return;
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

            const response = await userApi.getWaitingCourse(userAccount);
            setWaitingCourse(response);

            setLoading(false);
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

  const columns: ColumnsType<CourseWaitingProps> = [
    {
      title: "Course Name",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Course Code",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <button
            className="py-1 px-4 rounded-md bg-green-500 text-white"
            onClick={() =>
              handleVerify(userInfo?.hoTen, account, record.maKhoaHoc)
            }
          >
            Verify
          </button>
        );
      },
    },
  ];

  return (
    <AdminLayoutPage title="User's Information">
      <>
        <UserInfoComp user={userInfo} isLoading={loading} />

        <AdminTable
          columns={columns}
          dataSource={waitingCourse}
          title="Course Waiting List"
        />
      </>
    </AdminLayoutPage>
  );
}

export default AdminUserDetailPage;
