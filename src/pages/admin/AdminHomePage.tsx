import AdminStatistic from "components/admin/AdminStatistic/AdminStatistic";
import AdminStatisticChart from "components/admin/AdminStatisticChart/AdminStatisticChart";
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
  }, []);

  return (
    <section className="rounded">
      <AdminStatistic />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <AdminStatisticChart />
        </div>
        <div className="col-span-6"></div>
      </div>
    </section>
  );
}

export default AdminHomePage;
