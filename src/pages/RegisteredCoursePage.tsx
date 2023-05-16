import courseAPI from "api/courseAPI";
import userApi from "api/userAPI";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { COURSE_GROUP } from "constants/common";
import CourseItemLayout from "layouts/CourseItemLayout/CourseItemLayout";
import { CourseItem, UnregisterCourse } from "../models";
import React, { useEffect, useState } from "react";
import {
  selectLoadingUser,
  selectLoginInfo,
  userAction,
} from "redux/User/userSlice";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CourseTable from "components/courseTable/CourseTable";
import { toastMessage } from "../utils";
import { ToastType } from "../constants";

function RegisterCoursePage() {
  const loginInfo = useAppSelector(selectLoginInfo);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { taiKhoan, chiTietKhoaHocGhiDanh } = loginInfo;

  useEffect(() => {
    (async () => {
      try {
        const res = await userApi.getUserInfo();
        const res2: CourseItem[] = await courseAPI.getAllCourse({
          MaNhom: COURSE_GROUP,
        });

        const { matKhau, chiTietKhoaHocGhiDanh, ...restProps } = res;
        const courseListUserRegisterd = res2.filter((course) =>
          chiTietKhoaHocGhiDanh.some((x) => x.maKhoaHoc === course.maKhoaHoc)
        );

        dispatch(
          userAction.fetchLoginSuccess({
            chiTietKhoaHocGhiDanh: courseListUserRegisterd,
            ...restProps,
          })
        );

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        dispatch(userAction.fetchLoginFailed());
        console.log(error);
      }
    })();

    return () => {
      dispatch(userAction.resetRegisteredCourse());
    };
  }, [dispatch]);

  async function handleUnRegister(courseCode: string) {
    if (!taiKhoan || !courseCode) return;

    const data: UnregisterCourse = { maKhoaHoc: courseCode, taiKhoan };

    try {
      setIsLoading(true);
      const message: string = await courseAPI.unregisterCourse(data);

      const res = await userApi.getUserInfo();
      const res2: CourseItem[] = await courseAPI.getAllCourse({
        MaNhom: COURSE_GROUP,
      });

      const { matKhau, chiTietKhoaHocGhiDanh, ...restProps } = res;
      const courseListUserRegisterd = res2.filter((course) =>
        chiTietKhoaHocGhiDanh.some((x) => x.maKhoaHoc === course.maKhoaHoc)
      );

      dispatch(
        userAction.fetchLoginSuccess({
          chiTietKhoaHocGhiDanh: courseListUserRegisterd,
          ...restProps,
        })
      );

      const successMessage = toastMessage(message, ToastType.SUCCESS);
      successMessage();

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8 text-center text-2xl uppercase font-semibold">
        <h2>Registered Courses</h2>
      </div>

      {isLoading && <LoadingCircle />}

      {!isLoading &&
        chiTietKhoaHocGhiDanh &&
        chiTietKhoaHocGhiDanh.length < 1 && (
          <h2>You hadn't registered any course! Try register one!</h2>
        )}

      {!isLoading &&
        chiTietKhoaHocGhiDanh &&
        chiTietKhoaHocGhiDanh.length > 0 && (
          <CourseTable
            registerCourseList={chiTietKhoaHocGhiDanh}
            onUnregister={handleUnRegister}
          />
        )}
    </div>
  );
}

export default RegisterCoursePage;
