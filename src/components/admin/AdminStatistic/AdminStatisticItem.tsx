import React, { FC, ReactElement, ReactNode, SVGProps } from "react";
import styles from "./adminStaticItem.module.scss";
import clsx from "clsx";

interface Props {
  amount: number;
  text: string;
  icon: ReactElement;
  position: number;
}

function AdminStatisticItem({ amount, text, icon: Icon, position }: Props) {
  return (
    <div
      className={clsx(`${styles.statistical} text-white`, {
        [`${styles["course-list"]}`]: position === 1,
        [`${styles["category-list"]}`]: position === 2,
        [`${styles["teacher-list"]}`]: position === 3,
        [`${styles["student-list"]}`]: position === 4,
      })}
    >
      <div className="flex gap-2 justify-between items-center">
        <p className="text-base uppercase">{text}</p>
        {Icon}
      </div>
      <p className="mt-2 text-2xl">{amount}</p>
    </div>
  );
}

export default AdminStatisticItem;
