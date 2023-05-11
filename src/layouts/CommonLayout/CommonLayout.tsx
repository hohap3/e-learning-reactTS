import React, { Children, FC, ReactElement, ReactNode } from "react";
import styles from "./commonLayout.module.scss";

interface Props {
  title?: string;
  description?: string;
  children?: ReactNode;
}

function CommonLayout({ title, description, children }: Props) {
  return (
    <section
      className={`${styles["commonLayout"]} text-center py-[3rem] px-[12px]`}
    >
      <div className="container mx-auto">
        <div className="mb-4">
          <h6 className="uppercase relative bg-white">{title}</h6>
          <h2 className="capitalize text-[2.6rem] mb-8 font-medium">
            {description}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default CommonLayout;
