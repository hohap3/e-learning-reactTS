import courseAPI from "api/courseAPI";
import { useAppDispatch, useAppSelector } from "app/hooks";
import CourseItemDetail from "components/CourseItemDetail/CourseItemDetail";
import CourseItemInfo from "components/CourseItemDetail/CourseItemInfo";
import ScrollToTop from "components/ScrollToTopBtn/ScrollToTop";
import Footer from "layouts/Footers/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseItem } from "../models";

import { ACCESS_TOKEN, ADMIN_TOKEN } from "constants/common";
import { selectLoginInfo, userAction } from "redux/User/userSlice";
import Swal from "sweetalert2";
import {
  fetchCourseRegisterDetail,
  getLocalStorageData,
  toastMessage,
} from "../utils";
import { ToastType } from "../constants";
import { Backdrop, CircularProgress } from "@mui/material";
import { courseAction, selectLoadingCourse } from "redux/Course/courseSlice";
import userApi from "api/userAPI";

function CourseItemPage() {
  const [courseItem, setCourseItem] = useState<null | CourseItem>(null);
  const loading = useAppSelector(selectLoadingCourse);
  const { courseId } = useParams();
  const [showScrollBtn, setShowScrollBtn] = useState<boolean>(false);
  const accessToken =
    getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);
  const loginInfo = useAppSelector(selectLoginInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Call api
  useEffect(() => {
    (async () => {
      try {
        const res: CourseItem = await courseAPI.getCourseInfo(
          courseId as string
        );

        setTimeout(() => {
          setCourseItem(res);
        }, 700);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      setCourseItem(null);
    };
  }, []);

  // Handle event
  useEffect(() => {
    (() => {
      document.documentElement.scrollTop = 0;
    })();

    function handleShowScrollBtn() {
      setShowScrollBtn(window.scrollY > 400);
    }

    window.addEventListener("scroll", handleShowScrollBtn);

    return () => {
      window.removeEventListener("scroll", handleShowScrollBtn);
    };
  }, []);

  async function handleRegisterCourse() {
    if (!accessToken) {
      Swal.fire({
        title: "You're not log in!",
        text: "You need to log in so that you can register this course !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now",
        cancelButtonText: "Stay this page",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signIn");
        }
      });
    }
    dispatch(courseAction.startLoading());
    setTimeout(async () => {
      try {
        await courseAPI.registerCourse({
          maKhoaHoc: courseId,
          taiKhoan: loginInfo?.taiKhoan as string,
        });

        const successMessage = toastMessage(
          "Register course successfully!",
          ToastType.SUCCESS
        );
        const result = fetchCourseRegisterDetail();

        result.then((res: any) => {
          const { chiTietKhoaHocGhiDanh, ...restProps } = res;
          dispatch(
            userAction.fetchLoginSuccess({
              chiTietKhoaHocGhiDanh,
              ...restProps,
            })
          );
        });

        dispatch(courseAction.doneLoading());
        if (!loading) successMessage();
      } catch (error: any) {
        console.log(error);
        dispatch(courseAction.doneLoading());
        const { data } = error.response;
        Swal.fire({
          title: `${data}`,
          text: "This course had been registered!",
          icon: "error",
        });
      }
    }, 600);
  }

  return (
    <section className="mt-[74px]">
      <CourseItemDetail
        courseItem={courseItem}
        onRegister={handleRegisterCourse}
      />

      <CourseItemInfo />

      {showScrollBtn && <ScrollToTop />}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Footer />
    </section>
  );
}

export default CourseItemPage;
