import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import GetAppIcon from "@mui/icons-material/GetApp";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PublicIcon from "@mui/icons-material/Public";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Rating } from "@mui/material";
import { useAppSelector } from "app/hooks";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { selectLoadingCourse } from "redux/Course/courseSlice";
import { selectLoginInfo } from "redux/User/userSlice";
import { CourseItem } from "../../models";
import { getDefaultImagePath } from "../../utils";
import styles from "./courseItem.module.scss";
import CourseDetailSkeleton from "./CourseItemSkeleton/CourseItemSkeleton";

interface Props {
  courseItem: CourseItem | null;
  onRegister: () => void;
}

function CourseItemDetail({ courseItem, onRegister }: Props) {
  const imageRef = useRef<null | HTMLImageElement>(null);
  const divRef = useRef<null | HTMLDivElement>(null);
  const [valueRating, setValueRating] = useState<number>(4.6);
  const loginInfo = useAppSelector(selectLoginInfo);
  const { courseId } = useParams();
  const loading = useAppSelector(selectLoadingCourse);

  useEffect(() => {
    function handleError(e: any) {
      const { target } = e;
      const divWidth = divRef.current && (divRef.current.clientWidth as number);

      const defaultPath = getDefaultImagePath({ width: divWidth, height: 191 });
      target.src = defaultPath;
    }

    imageRef.current && imageRef.current.addEventListener("error", handleError);

    return () => {
      imageRef.current &&
        imageRef.current.removeEventListener("error", handleError);
    };
  }, [courseItem]);

  if (!courseItem) return <CourseDetailSkeleton />;

  const courseHasRegistered =
    Object.keys(loginInfo).length > 0 &&
    loginInfo?.chiTietKhoaHocGhiDanh &&
    loginInfo.chiTietKhoaHocGhiDanh.some(
      (course) => course.maKhoaHoc === courseId
    );

  const {
    biDanh,
    danhMucKhoaHoc: { tenDanhMucKhoaHoc },
    hinhAnh,
    luotXem,
    moTa,
    ngayTao,
    nguoiTao: { hoTen },
    soLuongHocVien,
    tenKhoaHoc,
  } = courseItem;

  return (
    <div className={`${styles["course-item"]}`}>
      <div className="container mx-auto">
        <div className={`${styles["course-item-container"]}`}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <div className={`${styles["course-item-grid-item"]}`}>
                <h4 className="text-[#06bbcc] font-medium text-xl">
                  {`${tenDanhMucKhoaHoc} > ${tenKhoaHoc}`}
                </h4>
                <div className="my-4 text-white">
                  <h2 className=" text-2xl capitalize">{tenKhoaHoc}</h2>
                  <p className="my-2">{moTa}</p>
                  <div className="my-2 flex items-center gap-2">
                    <p className="text-[#faaf00]">{valueRating}</p>
                    <Rating readOnly value={valueRating} precision={0.1} />
                    <p>
                      {soLuongHocVien > 1
                        ? `${soLuongHocVien.toLocaleString()} students`
                        : `${soLuongHocVien} student`}
                    </p>
                  </div>
                  <p className="mb-2">Created by {hoTen}</p>
                  <div className="flex items-center gap-2">
                    <p>Post date : {ngayTao}</p>
                    <p className="flex gap-2">
                      <PublicIcon />
                      English , Vietnamese
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
                  <img ref={imageRef} src={hinhAnh} alt={biDanh} />
                </div>
                <div className="py-8 px-6">
                  <button
                    onClick={() => onRegister()}
                    className={clsx(
                      `py-2 w-full bg-[#06bbcc] rounded text-white capitalize`,
                      {
                        ["bg-[#ccc]"]: courseHasRegistered,
                        ["text-[##adadad]"]: courseHasRegistered,
                        ["cursor-not-allowed"]: courseHasRegistered,
                      }
                    )}
                    disabled={courseHasRegistered || loading}
                  >
                    {courseHasRegistered
                      ? "Course had been registered"
                      : "Register now"}
                  </button>

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
                      Current views : {luotXem}
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
  );
}

export default CourseItemDetail;
