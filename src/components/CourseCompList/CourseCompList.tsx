import { useAppSelector } from "app/hooks";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";
import CourseItemLayout from "layouts/CourseItemLayout/CourseItemLayout";
import React from "react";
import {
  selectCourseList,
  selectLoadingCourse,
} from "redux/Course/courseSlice";

function CourseCompList() {
  const courseList = useAppSelector(selectCourseList);
  const loading = useAppSelector(selectLoadingCourse);

  if (courseList.length < 1 || loading) return <LoadingCircle />;

  return (
    <div className="grid grid-cols-3 gap-4">
      {courseList.map((courseItem) => (
        <div className="col-span-1">
          <CourseItemLayout courseItem={courseItem} />
        </div>
      ))}
    </div>
  );
}

export default CourseCompList;
