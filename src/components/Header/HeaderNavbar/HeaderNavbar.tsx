import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./headerNavbar.module.scss";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectHasLogin,
  selectLoginInfo,
  userAction,
} from "redux/User/userSlice";
import { getLocalStorageData, toastMessage } from "../../../utils";
import { ACCESS_TOKEN } from "constants/common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRef, useState } from "react";
import clsx from "clsx";
import Swal from "sweetalert2";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ToastType } from "../../../constants";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

function HeaderNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const loginInfo = useAppSelector(selectLoginInfo);
  const hasLogin = useAppSelector(selectHasLogin);
  const accessToken = getLocalStorageData(ACCESS_TOKEN);
  const navbarRef = useRef<null | HTMLDivElement>(null);
  const navbarLoginNav = useRef<null | HTMLDivElement>(null);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function moveToSignIn() {
    document.documentElement.scrollTop = 0;
    navigate("/signIn");
  }

  function handleToggleClick() {
    setOpenNav((prevState) => !prevState);
    if (!navbarLoginNav.current) return;

    const hasReachHeight = navbarLoginNav.current.clientHeight === 118;
    if (hasReachHeight) navbarLoginNav.current.style.overflowY = "scroll";
  }

  // #d33
  // #3085d6

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
        const accessToken = getLocalStorageData(ACCESS_TOKEN);
        if (!accessToken) return;
        localStorage.removeItem(ACCESS_TOKEN);
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
    <nav className={styles["header__navbar"]}>
      <div className={styles["header__navbar-item"]}>
        <NavLink
          to="/"
          className={({ isActive, isPending }) => {
            return isActive ? "text-[#06bbcc]" : "text-black";
          }}
          onClick={() => (document.documentElement.scrollTop = 0)}
        >
          Home
        </NavLink>
      </div>
      <div className={styles["header__navbar-item"]}>
        <NavLink
          to="/about"
          className={({ isActive, isPending }) => {
            return isActive ? "text-[#06bbcc]" : "text-black";
          }}
          onClick={() => (document.documentElement.scrollTop = 0)}
        >
          About
        </NavLink>
      </div>
      <div className={styles["header__navbar-item"]}>Courses</div>
      <div className={styles["header__navbar-item"]}>
        <NavLink
          to="/contact"
          className={({ isActive, isPending }) => {
            return isActive ? "text-[#06bbcc]" : "text-black";
          }}
          onClick={() => (document.documentElement.scrollTop = 0)}
        >
          Contact
        </NavLink>
      </div>

      {location.pathname !== "/signIn" &&
        location.pathname !== "/register" &&
        Object.keys(loginInfo).length < 1 &&
        !hasLogin &&
        !accessToken && (
          <button
            className={styles["header__navbar-item-join"]}
            onClick={moveToSignIn}
          >
            <h2 className="capitalize text-white">Join Now</h2>
            <ArrowForwardIcon />
          </button>
        )}

      {((loginInfo && hasLogin) || accessToken) && (
        <div
          ref={navbarRef}
          className={clsx(`${styles["header__navbar-item-login"]}`, {
            [`${styles["open"]}`]: openNav,
          })}
          onClick={handleToggleClick}
        >
          <div className="cursor-pointer flex items-center gap-1">
            <p className="uppercase">{loginInfo.hoTen}</p>
            {openNav ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          <div
            className={clsx(`${styles["header__navbar-item-login-overlay"]}`)}
          ></div>
          <div
            ref={navbarLoginNav}
            className={`${styles["header__navbar-item-login-nav"]}`}
          >
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
      )}
    </nav>
  );
}

export default HeaderNavbar;
