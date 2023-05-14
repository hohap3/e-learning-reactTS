import React, { useEffect, useState } from "react";
import styles from "./courseList.module.scss";
import { useAppSelector } from "app/hooks";
import { selectCourseListCategory } from "redux/Course/courseSlice";
import { LinearProgress } from "@mui/material";
import CourseItemLayout from "layouts/CourseItemLayout/CourseItemLayout";
import ScrollToTop from "components/ScrollToTopBtn/ScrollToTop";

function CourseList() {
  const courseListByCategory = useAppSelector(selectCourseListCategory);
  const [showScrollBtn, setShowScrollBtn] = useState<boolean>(false);

  useEffect(() => {
    function handleShowScrollBtn() {
      setShowScrollBtn(window.scrollY >= 600);
    }

    window.addEventListener("scroll", handleShowScrollBtn);

    document.documentElement.scrollTop = 0;

    return () => {
      window.removeEventListener("scroll", handleShowScrollBtn);
    };
  }, []);

  return (
    <section className={`${styles["course-list"]} aspect-video`}>
      {courseListByCategory.length < 1 && <LinearProgress />}

      <div className="container mx-auto px-4 lg:px-0">
        <div className={`${styles["course-list-container"]}`}>
          <div className="grid grid-cols-12 gap-4">
            {courseListByCategory.length > 0 &&
              courseListByCategory.map((courseItem) => (
                <div
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                  key={courseItem.maKhoaHoc}
                >
                  <CourseItemLayout courseItem={courseItem} />
                </div>
              ))}
          </div>
        </div>
      </div>

      {showScrollBtn && <ScrollToTop />}
    </section>
  );
}

export default CourseList;
