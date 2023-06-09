import { useAppSelector } from "app/hooks";
import { ACCESS_TOKEN, ADMIN_TOKEN } from "constants/common";
import AuthLayout from "layouts/AuthLayout/AuthLayout";
import { FC, useEffect, useRef } from "react";
import { getLocalStorageData } from "../utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { selectHasLogin } from "redux/User/userSlice";

function authHOC(WrapComponent: FC<any>) {
  return function () {
    const hasLogin = useAppSelector(selectHasLogin);
    const accessToken = getLocalStorageData(ACCESS_TOKEN) ?? null;
    const adminToken = getLocalStorageData(ADMIN_TOKEN) ?? null;
    const timeIntervalId = useRef<null | any>(null);
    const navigate = useNavigate();

    // Prevent when user has been logged in and tried to move to login again!
    useEffect(() => {
      if (hasLogin || accessToken || adminToken) {
        Swal.fire({
          title: "You have been logged in!",
          html: "Will return to homepage after <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const element = Swal.getHtmlContainer()?.querySelector("b");
            timeIntervalId.current = setInterval(() => {
              if (element) element.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            if (timeIntervalId.current) clearInterval(timeIntervalId.current);
            navigate("/");
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            navigate("/");
          }
        });
      }
    }, []);

    return (
      <>
        <AuthLayout>
          <WrapComponent />
        </AuthLayout>
      </>
    );
  };
}

export default authHOC;
