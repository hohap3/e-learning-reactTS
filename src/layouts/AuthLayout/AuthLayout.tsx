import React, { ReactNode, useEffect, useRef } from "react";
import styles from "./authLayout.module.scss";
import { useAppSelector } from "app/hooks";
import { getLocalStorageData } from "../../utils";
import { useNavigate } from "react-router-dom";
import { selectHasLogin } from "redux/User/userSlice";
import { ACCESS_TOKEN } from "constants/common";
import Swal from "sweetalert2";

type Props = { children: ReactNode };

function AuthLayout({ children }: Props) {
  return (
    <section className={`${styles.auth}`}>
      <div className={`${styles["auth-overlay"]}`}></div>
      <div className={`${styles["auth-detail"]}`}>
        <div className="bg-[#fff] w-[410px] md:w-[700px] p-4 rounded">
          {children}
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;
