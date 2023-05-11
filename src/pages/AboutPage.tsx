import AboutPageComp from "components/AboutPageComp/AboutPageComp";
import GeneralLayout from "layouts/CourseListLayout/GeneralLayout";
import WithFooterLayout from "layouts/WithFooter/WithFooterLayout";
import React from "react";

function AboutPage() {
  return (
    <WithFooterLayout>
      <GeneralLayout title="Home" text="About">
        <AboutPageComp />
      </GeneralLayout>
    </WithFooterLayout>
  );
}

export default AboutPage;
