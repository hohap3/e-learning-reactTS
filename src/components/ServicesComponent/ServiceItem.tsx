import React, { FC, ReactElement } from "react";
import styles from "./services.module.scss";

interface Props {
  icon?: any;
  title?: string;
}

function ServiceItem({ icon: Icon, title }: Props) {
  return (
    <section
      className={`flex flex-col justify-center items-center bg-[#f0fbfc] ${styles["service-item"]}`}
    >
      <div className={`${styles["service-icon"]} text-[#06bbcc]`}>
        <Icon sx={{ fontSize: "4rem" }} />
      </div>
      <div className={`${styles["service-text"]}`}>
        <h2 className="capitalize text-xl mt-3 mb-4 font-semibold">{title}</h2>
        <p>
          Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam
        </p>
      </div>
    </section>
  );
}

export default ServiceItem;
