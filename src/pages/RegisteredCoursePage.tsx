import courseAPI from "api/courseAPI";
import userApi from "api/userAPI";
import { useAppDispatch, useAppSelector } from "app/hooks";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";
import CourseTable from "components/courseTable/CourseTable";
import { COURSE_GROUP } from "constants/common";
import { useEffect, useState } from "react";
import { selectLoginInfo, userAction } from "redux/User/userSlice";
import { ToastType } from "../constants";
import { CourseItem, ListResponseAccount, UnregisterCourse } from "../models";
import { fetchCourseRegisterDetail, toastMessage } from "../utils";

function RegisterCoursePage() {
  const loginInfo = useAppSelector(selectLoginInfo);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { taiKhoan, chiTietKhoaHocGhiDanh } = loginInfo;

  useEffect(() => {
    (async () => {
      try {
        const result = fetchCourseRegisterDetail();

        result.then((res) => {
          const { chiTietKhoaHocGhiDanh, ...restProps } = res;

          dispatch(
            userAction.fetchLoginSuccess({
              chiTietKhoaHocGhiDanh,
              ...restProps,
            })
          );
        });

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

      const result = fetchCourseRegisterDetail();

      result.then((res) => {
        const { chiTietKhoaHocGhiDanh, ...restProps } = res;

        dispatch(
          userAction.fetchLoginSuccess({
            chiTietKhoaHocGhiDanh,
            ...restProps,
          })
        );
      });

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
