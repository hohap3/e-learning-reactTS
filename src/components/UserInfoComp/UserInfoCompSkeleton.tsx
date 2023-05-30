import { Skeleton } from "@mui/material";
import React from "react";

function UserInfoCompSkeleton() {
  return (
    <section className="grid grid-cols-12 gap-8">
      <div className="col-span-6">
        <Skeleton variant="circular" width={288} height={288} />
      </div>
      <div className="col-span-4">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={"80px"}
        />
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <Skeleton animation="wave" width={"100%"} />
          </div>

          <div className="flex gap-4 items-center">
            <Skeleton animation="wave" width={"100%"} />
          </div>

          <div className="flex gap-4 items-center">
            <Skeleton animation="wave" width={"100%"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserInfoCompSkeleton;
