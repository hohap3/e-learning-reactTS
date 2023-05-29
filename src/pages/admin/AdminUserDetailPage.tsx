import AdminLayoutPage from "layouts/admin/adminLayoutPage/AdminLayoutPage";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

function AdminUserDetailPage() {
  const { account } = useParams();

  console.log(account);

  return (
    <AdminLayoutPage title="Remaining Course List">
      <div></div>
    </AdminLayoutPage>
  );
}

export default AdminUserDetailPage;
