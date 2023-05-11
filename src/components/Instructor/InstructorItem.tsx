import React from "react";
import styles from "./instructorItem.module.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

interface Props {
  name?: string;
  description?: string;
  imgSrc?: string;
}

function InstructorItem({ name, description, imgSrc }: Props) {
  return (
    <section className={`${styles["instructor-item"]}`}>
      <div className={`${styles["instructor-image"]}`}>
        <img src={imgSrc} alt={name} />
      </div>
      <div className={`${styles["instructor-info"]} p-[24px] relative`}>
        <div
          className={`${styles["instructor-contact"]} flex items-center gap-0`}
        >
          <div className="flex items-center justify-center p-1 mx-1 text-white cursor-pointer bg-[#06bbcc] hover:bg-[#2bc5d4]">
            <FacebookIcon />
          </div>

          <div className="flex items-center justify-center p-1 mx-1 text-white cursor-pointer bg-[#06bbcc] hover:bg-[#2bc5d4]">
            <TwitterIcon />
          </div>

          <div className="flex items-center justify-center p-1 mx-1 text-white cursor-pointer bg-[#06bbcc] hover:bg-[#2bc5d4]">
            <InstagramIcon />
          </div>
        </div>
        <h2 className="capitalize text-black text-xl font-medium mb-2">
          {name}
        </h2>
        <p className="capitalize text-sm">{description}</p>
      </div>
    </section>
  );
}

export default InstructorItem;
