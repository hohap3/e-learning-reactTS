import React from "react";

import { useAppSelector } from "app/hooks";
import {
  selectDashboardCategoryList,
  selectDashboardCourseList,
  selectDashboardStudentList,
  selectDashboardTeacherList,
} from "redux/Dashboard/dashboardSlice";
import AdminStatisticItem from "./AdminStatisticItem";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Person3Icon from "@mui/icons-material/Person3";

function AdminStatistic() {
  const courseList = useAppSelector(selectDashboardCourseList);
  const categoryList = useAppSelector(selectDashboardCategoryList);
  const studentList = useAppSelector(selectDashboardStudentList);
  const teacherList = useAppSelector(selectDashboardTeacherList);

  return (
    <section className="bg-white p-5 rounded-md mb-6">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-3">
          <AdminStatisticItem
            amount={courseList.length}
            text="Course List"
            icon={<MenuBookIcon />}
            position={1}
          />
        </div>

        <div className="col-span-3">
          <AdminStatisticItem
            amount={categoryList.length}
            text="Category List"
            icon={<CategoryIcon />}
            position={2}
          />
        </div>

        <div className="col-span-3">
          <AdminStatisticItem
            amount={teacherList.length}
            text="Teacher List"
            icon={<Person3Icon />}
            position={3}
          />
        </div>

        <div className="col-span-3">
          <AdminStatisticItem
            amount={studentList.length}
            text="Student List"
            icon={<PermContactCalendarIcon />}
            position={4}
          />
        </div>
      </div>
    </section>
  );
}

export default AdminStatistic;
