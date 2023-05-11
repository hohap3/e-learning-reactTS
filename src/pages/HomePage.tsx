import { useAppDispatch } from "app/hooks";
import About from "components/About/About";
import Carousel from "components/Carousel/Carousel";
import CategoryList from "components/CategoryList/CategoryList";
import Instructor from "components/Instructor/Instructor";
import PopularCourseList from "components/PopularCourseList/PopularCourseList";
import ScrollToTop from "components/ScrollToTopBtn/ScrollToTop";
import Services from "components/ServicesComponent/Services";
import StudentTestimonial from "components/StudentTestimonial/StudentTestimonial";
import CommonLayout from "layouts/CommonLayout/CommonLayout";
import Footer from "layouts/Footers/Footer";
import WithFooterLayout from "layouts/WithFooter/WithFooterLayout";

import { useEffect, useState } from "react";
import { courseAction } from "redux/Course/courseSlice";
import { userAction } from "redux/User/userSlice";

function HomePage() {
  const [showScroll, setShowScroll] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(courseAction.fetchCourse());
    dispatch(userAction.fetchUserList());
  }, [dispatch]);

  useEffect(() => {
    function handleShowScroll(): void {
      setShowScroll(window.scrollY > 1200);
    }

    window.addEventListener("scroll", handleShowScroll);
  }, []);

  return (
    <section className="mt-[74px]">
      <WithFooterLayout>
        <>
          <Carousel />

          <Services />

          <About />

          <CommonLayout title="Categories" description="Courses Categories">
            <CategoryList />
          </CommonLayout>

          <CommonLayout title="Courses" description="Popular Courses">
            <PopularCourseList />
          </CommonLayout>

          <CommonLayout title="Instructor" description="Expert Instructors">
            <Instructor />
          </CommonLayout>

          <CommonLayout title="Testimonial" description="Our Students Say!">
            <StudentTestimonial />
          </CommonLayout>

          {showScroll && <ScrollToTop />}
        </>
      </WithFooterLayout>
    </section>
  );
}

export default HomePage;
