import React from "react";
import styles from "./categoryItem.module.scss";
import { Skeleton } from "@mui/material";

function CategoryItemSkeleton() {
  return (
    <div
      className={`${styles["category-item"]} cursor-pointer w-full relative border border-2`}
    >
      {/* <img src={image} className="w-full object-cover h-[171px]" /> */}
      <Skeleton variant="rectangular" width={"100%"} height={171} />

      <div className="absolute right-1 bottom-1 bg-white py-[8px] px-[16px] shadow rounded-md">
        {/* <h2 className="capitalize text-xl">{tenDanhMuc}</h2> */}
        <Skeleton variant="text" />
      </div>
    </div>
  );
}

export default CategoryItemSkeleton;
