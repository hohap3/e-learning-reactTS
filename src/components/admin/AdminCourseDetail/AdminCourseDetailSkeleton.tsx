import React from "react";
import { LinearProgress, Skeleton } from "@mui/material";

function AdminCourseDetailSkeleton() {
  return (
    <>
      <LinearProgress />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7 lg:col-span-8">
          <div className="h-64">
            <div className="my-4 text-black">
              <h2 className=" text-2xl capitalize">
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                />
              </h2>
              <p className="my-2">
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                />
              </p>
              <div className="my-2 flex items-center gap-2">
                <p>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                  />
                </p>
              </div>
              <p className="mb-2">
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                />
              </p>
              <div className="flex items-center gap-2">
                <p>
                  {" "}
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                  />
                </p>
                <p className="flex gap-2">
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <div className={`bg-white border border-2 border-white rounded`}>
            <div>
              <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCourseDetailSkeleton;
