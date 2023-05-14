import { useAppSelector } from "app/hooks";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";
import { selectPopularCourseList } from "redux/Course/courseSlice";
import styles from "./popularCourse.module.scss";
import CourseItemLayout from "layouts/CourseItemLayout/CourseItemLayout";

function PopularCourseList() {
  const popularCourseList = useAppSelector(selectPopularCourseList);

  return (
    <section className={`${styles["popularCourse"]}`}>
      <div className="container mx-auto">
        {popularCourseList.length < 1 && <LoadingCircle />}
        {popularCourseList.length > 0 && (
          <div className="grid grid-cols-12 gap-4">
            {popularCourseList.map((courseItem) => (
              <div
                key={courseItem.maKhoaHoc}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <CourseItemLayout courseItem={courseItem} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PopularCourseList;
