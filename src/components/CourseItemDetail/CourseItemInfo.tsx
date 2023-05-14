import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import Box from "assets/companies/box-dark.svg";
import EventBrite from "assets/companies/eventbrite-dark.svg";
import Nasdaq from "assets/companies/nasdaq-dark.svg";
import NetApp from "assets/companies/netapp-dark.svg";
import Volkswagen from "assets/companies/volkswagen-dark.svg";

function CourseItemInfo() {
  return (
    <section className="my-8 px-4 lg:px-0">
      <div className="container mx-auto">
        <div className="mb-8 rounded border border-2 p-6">
          <h2 className="font-semibold mb-4 text-xl">What you'll learn</h2>
          <nav>
            <p className="flex items-center gap-2">
              <CheckIcon />
              Build an entire project from scratch!
            </p>

            <p className="flex items-center gap-2">
              <CheckIcon />
              Get Certification after you finish
            </p>

            <p className="flex items-center gap-2">
              <CheckIcon />
              Learn with the experience teacher who have more than 3 years
            </p>

            <p className="flex items-center gap-2">
              <CheckIcon />
              You'll have more change to support with teacher
            </p>
          </nav>
        </div>

        <div className="mb-8 rounded border border-2 p-6">
          <h2 className="font-semibold mb-1 text-base">
            Top companies offer this course to their employees
          </h2>
          <p className="text-sm">
            This course was selected for our collection of top-rated courses
            trusted by businesses worldwide
          </p>

          <nav className="flex items-center gap-4 mt-4 flex-col md:flex-row">
            <img src={Box} />
            <img src={EventBrite} />
            <img src={Nasdaq} />
            <img src={NetApp} />
            <img src={Volkswagen} />
          </nav>
        </div>
      </div>
    </section>
  );
}

export default CourseItemInfo;
