import React, { useEffect } from "react";
import ServiceItem from "./ServiceItem";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";
import HouseIcon from "@mui/icons-material/House";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import "animate.css";

function Services() {
  return (
    <section className=" py-[3rem] px-[0.75rem]">
      <section className="container mx-auto">
        <section className="grid grid-cols-12 gap-4">
          <div className="col-span-3 wow fadeInUp" data-wow-delay="0.1s">
            <ServiceItem icon={SchoolIcon} title="Skilled Instructors" />
          </div>

          <div className="col-span-3 fadeInUp" data-wow-delay="0.3s">
            <ServiceItem icon={PublicIcon} title="Online Classes" />
          </div>

          <div className="col-span-3">
            <ServiceItem icon={HouseIcon} title="Home Projects" />
          </div>

          <div className="col-span-3">
            <ServiceItem icon={LibraryBooksIcon} title="Book Library" />
          </div>
        </section>
      </section>
    </section>
  );
}

export default Services;
