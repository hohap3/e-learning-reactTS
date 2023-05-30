import clsx from "clsx";
import { ReactElement } from "react";
import CountUp from "react-countup";
import styles from "./adminStaticItem.module.scss";

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

      <CountUp
        start={0}
        end={amount}
        duration={4}
        enableScrollSpy={true}
        scrollSpyOnce={true}
      >
        {({ countUpRef }) => (
          <div>
            <span className="text-2xl text-white" ref={countUpRef}></span>
          </div>
        )}
      </CountUp>
    </div>
  );
}

export default AdminStatisticItem;
