import { useAppSelector } from "app/hooks";
import AdminChart from "components/admin/AdminChart/AdminChart";
import AdminLineChart from "components/admin/AdminLineChart/AdminLineChart";
import AdminStatistic from "components/admin/AdminStatistic/AdminStatistic";
import AdminStatisticChart from "components/admin/AdminStatisticChart/AdminStatisticChart";
import StaticCourseList from "components/admin/StaticCourseList/StaticCourseList";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  dashboardAction,
  selectDashboardCategoryList,
  selectDashboardCourseList,
  selectDashboardPopularCourses,
  selectDashboardStudentList,
  selectDashboardTeacherList,
} from "redux/Dashboard/dashboardSlice";

function AdminHomePage() {
  const courseList = useAppSelector(selectDashboardCourseList);
  const categoryList = useAppSelector(selectDashboardCategoryList);
  const studentList = useAppSelector(selectDashboardStudentList);
  const teacherList = useAppSelector(selectDashboardTeacherList);
  const popularCourse = useAppSelector(selectDashboardPopularCourses);

  const statisticList: number[] = [
    categoryList.length,
    courseList.length,
    studentList.length,
    teacherList.length,
  ];

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
          <AdminStatisticChart data={statisticList} />

          <div className="mt-6">
            <AdminLineChart />
          </div>
        </div>
        <div className="col-span-6">
          <div>
            <StaticCourseList courseList={popularCourse} />
          </div>
        </div>
        <div className="col-span-12">
          <AdminChart />
        </div>
      </div>
    </section>
  );
}

export default AdminHomePage;
