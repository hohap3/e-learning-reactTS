import userApi from "api/userAPI";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Personal from "components/Personal/Personal";
import { ACCESS_TOKEN, ADMIN_TOKEN } from "constants/common";
import AuthLayout from "layouts/AuthLayout/AuthLayout";
import Header from "layouts/Header/Header";
import WithoutFooter from "layouts/WithoutFooter/WithoutFooter";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  selectHasLogin,
  selectLoginInfo,
  userAction,
} from "redux/User/userSlice";
import Swal from "sweetalert2";
import { CourseItem, CourseRegister, ListResponseAccount } from "../models";
import { getLocalStorageData } from "../utils";

function PersonalPage() {
  const accessToken =
    getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);
  const loginInfo = useAppSelector(selectLoginInfo);
  const hasLogin = useAppSelector(selectHasLogin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
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
      }
    })();

    document.documentElement.scrollTop = 0;
  }, [accessToken]);

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
