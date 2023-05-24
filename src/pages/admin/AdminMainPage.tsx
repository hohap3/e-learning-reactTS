import { List, ListSubheader } from "@mui/material";
import { ACCESS_TOKEN, ADMIN_TOKEN, IS_ADMIN } from "constants/common";
import AdminCommonLayout from "layouts/admin/adminCommonLayout/AdminCommonLayout";
import AdminHeader from "layouts/admin/adminHeader/AdminHeader";
import React, { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getLocalStorageData } from "../../utils";
import Swal from "sweetalert2";

function AdminMainPage() {
  const accessToken = getLocalStorageData(ADMIN_TOKEN) ?? null;
  const isAdmin = getLocalStorageData(IS_ADMIN) ?? null;
  const timeIntervalId = useRef<null | number>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken && !isAdmin) {
      Swal.fire({
        title: "You need to log in and you must be an admin!",
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
    <section className="bg-[#000033] min-h-screen">
      <div className="container mx-auto">
        <AdminHeader />
        <AdminCommonLayout children={<Outlet />} />
      </div>
    </section>
  );
}

export default AdminMainPage;
