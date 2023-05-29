import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useAppDispatch, useAppSelector } from "app/hooks";
import clsx from "clsx";
import { ACCESS_TOKEN, ADMIN_TOKEN, IS_ADMIN } from "constants/common";
import { Ref, forwardRef, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  selectHasLogin,
  selectLoginInfo,
  userAction,
} from "redux/User/userSlice";
import Swal from "sweetalert2";
import { ToastType, mobileNavbarList } from "../../../constants";
import { getLocalStorageData, toastMessage } from "../../../utils";
import styles from "./headerNavMobile.module.scss";

interface HeaderMobileState {
  toggleNavbar: boolean;
}

function HeaderNavMobile(
  { toggleNavbar }: HeaderMobileState,
  ref: Ref<HTMLDivElement>
) {
  const navigate = useNavigate();
  const loginInfo = useAppSelector(selectLoginInfo);
  const accessToken = getLocalStorageData(ACCESS_TOKEN);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const adminToken = getLocalStorageData(ADMIN_TOKEN);
  const isAdmin = getLocalStorageData(IS_ADMIN);

  function handleLogout() {
    Swal.fire({
      title: "Do you want to logout?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        const accessToken =
          getLocalStorageData(ACCESS_TOKEN) ?? getLocalStorageData(ADMIN_TOKEN);
        if (!accessToken) return;
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(ADMIN_TOKEN);
        localStorage.removeItem(IS_ADMIN);
        dispatch(userAction.logout());

        const successToast = toastMessage(
          "Logout successfully!",
          ToastType.SUCCESS
        );
        successToast();
      }
    });
  }
  return (
    <div
      ref={ref}
      className={clsx(`${styles["header__navbar-mobile"]}`, {
        [`${styles["open-nav"]}`]: toggleNavbar,
      })}
    >
      <div className="px-4">
        {mobileNavbarList.map(({ title, path, icon: Icon }, idx) => (
          <NavLink
            to={path}
            className={({ isActive, isPending }) => {
              return isActive ? "text-[#06bbcc]" : "text-black";
            }}
            onClick={() => (document.documentElement.scrollTop = 0)}
          >
            <div className="flex gap-4 mb-4">
              <Icon />

              <p>{title}</p>
            </div>
          </NavLink>
        ))}
      </div>
      <div className="mt-10 border-t-2 p-4">
        {accessToken ?? adminToken ? (
          <div className={clsx(`${styles["header__navbar-mobile-user"]}`)}>
            <div
              className="cursor-pointer flex items-center gap-1"
              onClick={() => setOpenNav((prevState) => !prevState)}
            >
              {openNav ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              <p className="uppercase">{loginInfo.hoTen}</p>
            </div>

            <div
              className={clsx(
                `${styles["header__navbar-mobile-user-navbar"]}`,
                { [`${styles["open-nav-mobile"]}`]: openNav }
              )}
            >
              {isAdmin && (
                <button
                  className="flex gap-2 mb-4"
                  onClick={() => navigate("/admin/home")}
                >
                  <AdminPanelSettingsIcon />
                  Admin's Page
                </button>
              )}

              <button
                className="flex gap-2 mb-4"
                onClick={() => navigate("/personal-info/home")}
              >
                <ManageAccountsIcon />
                Personal's Info
              </button>

              <button
                onClick={handleLogout}
                className="text-[1.1rem] flex gap-2 items-center"
              >
                <LogoutIcon />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <NavLink
              to="/signIn"
              className={({ isActive, isPending }) => {
                return isActive ? "text-[#06bbcc]" : "text-black";
              }}
              onClick={() => (document.documentElement.scrollTop = 0)}
            >
              <div className="flex gap-4 mb-4">
                <VpnKeyIcon />

                <p>Sign In</p>
              </div>
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive, isPending }) => {
                return isActive ? "text-[#06bbcc]" : "text-black";
              }}
              onClick={() => (document.documentElement.scrollTop = 0)}
            >
              <div className="flex gap-4 mb-4">
                <HowToRegIcon />

                <p>Register</p>
              </div>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default forwardRef(HeaderNavMobile);
