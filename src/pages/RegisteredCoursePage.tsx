import { useAppSelector } from "app/hooks";
import CourseItemLayout from "layouts/CourseItemLayout/CourseItemLayout";
import React, { useEffect } from "react";
import { selectLoginInfo } from "redux/User/userSlice";

function RegisterCoursePage() {
  const loginInfo = useAppSelector(selectLoginInfo);

  const { chiTietKhoaHocGhiDanh } = loginInfo;

  return (
    <div>
      <div className="mb-8 text-center text-2xl uppercase font-semibold">
        <h2>Registered Courses</h2>
      </div>

      {chiTietKhoaHocGhiDanh && chiTietKhoaHocGhiDanh.length < 1 && (
        <h2>You hadn't registered any course! Try register one!</h2>
      )}

      {chiTietKhoaHocGhiDanh && chiTietKhoaHocGhiDanh.length > 0 && (
        <div className="grid grid-cols-12 gap-4">
          {chiTietKhoaHocGhiDanh.map((courseItem) => (
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <CourseItemLayout courseItem={courseItem} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RegisterCoursePage;
