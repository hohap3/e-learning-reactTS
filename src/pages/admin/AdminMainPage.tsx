import { List, ListSubheader } from "@mui/material";
import AdminCommonLayout from "layouts/admin/adminCommonLayout/AdminCommonLayout";
import AdminHeader from "layouts/admin/adminHeader/AdminHeader";
import React from "react";
import { Outlet } from "react-router-dom";

function AdminMainPage() {
  return (
    <section className="bg-[#000033]">
      <div className="container mx-auto">
        <AdminHeader />
        <AdminCommonLayout children={<Outlet />} />
      </div>
    </section>
  );
}

export default AdminMainPage;
