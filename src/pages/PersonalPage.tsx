import { useAppDispatch, useAppSelector } from "app/hooks";
import { ACCESS_TOKEN } from "constants/common";
import React, { useEffect, useRef } from "react";
import {
  selectHasLogin,
  selectLoginInfo,
  userAction,
} from "redux/User/userSlice";
import { getLocalStorageData } from "../utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Header from "layouts/Header/Header";
import userApi from "api/userAPI";
import { CourseItem, ListResponseAccount } from "../models";
import WithoutFooter from "layouts/WithoutFooter/WithoutFooter";
import AuthLayout from "layouts/AuthLayout/AuthLayout";
import Personal from "components/Personal/Personal";

function PersonalPage() {
  const accessToken = getLocalStorageData(ACCESS_TOKEN) ?? null;
  const loginInfo = useAppSelector(selectLoginInfo);
  const hasLogin = useAppSelector(selectHasLogin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!accessToken) {
        Swal.fire({
          title: "You can't go to this page!",
          text: " You need to log in!",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Move to Login page!",
          cancelButtonText: "Move to Homepage!",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/signIn");
          } else {
            navigate("/");
          }
        });
        return;
      } else {
        const res: ListResponseAccount<CourseItem> =
          await userApi.getUserInfo();
        dispatch(userAction.fetchLoginSuccess(res));
      }
    })();

    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <WithoutFooter>
      <>
        <Header />

        {!accessToken || Object.keys(loginInfo).length < 1 || !hasLogin ? (
          <div className="mt-[74px]">
            <AuthLayout>
              <div></div>
            </AuthLayout>
          </div>
        ) : (
          <section className="mt-[74px] h-screen">
            <div className="h-[74px] bg-[#06bbcc] text-white flex items-center justify-center text-xl capitalize">
              Personal's Info
            </div>

            <Personal />
          </section>
        )}
      </>
    </WithoutFooter>
  );
}

export default PersonalPage;
