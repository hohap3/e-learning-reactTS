import CoursesComp from "components/CoursesComp/CoursesComp";
import ScrollToTop from "components/ScrollToTopBtn/ScrollToTop";
import GeneralLayout from "layouts/CourseListLayout/GeneralLayout";
import WithFooterLayout from "layouts/WithFooter/WithFooterLayout";
import { useEffect, useState } from "react";

function CoursePage() {
  const [showScrollBtn, setShowScrollBtn] = useState<boolean>(false);
  useEffect(() => {
    function handleShowScrollBtn() {
      setShowScrollBtn(window.scrollY >= 600);
    }

    window.addEventListener("scroll", handleShowScrollBtn);

    return () => {
      window.removeEventListener("scroll", handleShowScrollBtn);
    };
  }, []);

  return (
    <WithFooterLayout>
      <GeneralLayout title="Home" text="Courses">
        <>
          <CoursesComp />

          {showScrollBtn && <ScrollToTop />}
        </>
      </GeneralLayout>
    </WithFooterLayout>
  );
}

export default CoursePage;
