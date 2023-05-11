import { useAppDispatch } from "app/hooks";
import CourseList from "components/CourseList/CourseList";
import GeneralLayout from "layouts/CourseListLayout/GeneralLayout";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { courseAction } from "redux/Course/courseSlice";

function CourseListPage() {
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    dispatch(courseAction.fetchCourseListCategory(categoryId as string));

    return () => {
      dispatch(courseAction.resetCourseListCategory());
    };
  }, []);

  return (
    <section className="mt-[74px]">
      <GeneralLayout title="Category" text={categoryId as string}>
        <CourseList />
      </GeneralLayout>
    </section>
  );
}

export default CourseListPage;
