import AdminStatistic from "components/admin/AdminStatistic/AdminStatistic";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dashboardAction } from "redux/Dashboard/dashboardSlice";

function AdminHomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dashboardAction.fetchData());

    return () => {
      dispatch(dashboardAction.resetAllData());
    };
  }, [dispatch]);

  return (
    <section className="rounded">
      <AdminStatistic />
    </section>
  );
}

export default AdminHomePage;
