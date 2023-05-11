import React, { useRef } from "react";
import styles from "../courseItem.module.scss";
import { LinearProgress, Skeleton } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GetAppIcon from "@mui/icons-material/GetApp";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

function CourseDetailSkeleton() {
  const divRef = useRef<null | HTMLDivElement>(null);

  return (
    <>
      <LinearProgress />
      <div className={`${styles["course-item"]}`}>
        <div className="container mx-auto">
          <div className={`${styles["course-item-container"]}`}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <div className={`${styles["course-item-grid-item"]}`}>
                  <h4 className="text-[#06bbcc] font-medium text-xl">
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                    />
                  </h4>
                  <div className="my-4 text-white">
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
                      <p className="text-[#faaf00]">
                        <Skeleton
                          animation="wave"
                          variant="text"
                          sx={{ fontSize: "1rem" }}
                        />
                      </p>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                      />
                      <p>
                        <Skeleton
                          animation="wave"
                          variant="text"
                          sx={{ fontSize: "1rem" }}
                        />
                      </p>
                    </div>
                    <p className="mb-2">
                      {" "}
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

              <div className="col-span-4" ref={divRef}>
                <div
                  className={`${styles["course-item-grid-item"]} bg-white border border-2 border-white rounded`}
                >
                  <div>
                    <Skeleton variant="rectangular" width={449} height={191} />
                  </div>
                  <div className="py-8 px-6">
                    <Skeleton variant="text" animation="wave" />

                    <h2 className="text-base my-2 font-semibold">
                      This course includes:
                    </h2>
                    <div>
                      <p className="flex items-center gap-2 mb-1">
                        <PlayCircleOutlineIcon />
                        18.5 hours on-demand video
                      </p>
                      <p className="flex items-center gap-2 mb-1">
                        <InsertDriveFileIcon /> 20 articles
                      </p>
                      <p className="flex items-center gap-2 mb-1">
                        <VisibilityIcon />
                        Current views : {0}
                      </p>
                      <p className="flex items-center gap-2 mb-1">
                        <GetAppIcon />
                        235 downloadable resources
                      </p>
                      <p className="flex items-center gap-2 mb-1">
                        <AccessibilityNewIcon />
                        Certificate of completion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetailSkeleton;
