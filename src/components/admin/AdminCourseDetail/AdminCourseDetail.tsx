import PublicIcon from "@mui/icons-material/Public";
import { CourseItem } from "models/index";
import { SyntheticEvent } from "react";
import { getDefaultImagePath, limitWordLength } from "utils/index";

import AdminCourseDetailSkeleton from "./AdminCourseDetailSkeleton";

interface Props {
  courseItem: CourseItem | null;
}

function AdminCourseDetail({ courseItem }: Props) {
  if (!courseItem) return <AdminCourseDetailSkeleton />;

  const {
    tenKhoaHoc,
    moTa,
    soLuongHocVien,
    ngayTao,
    hinhAnh,
    biDanh,
    nguoiTao: { hoTen },
  } = courseItem;

  function handleErrorImage(e: SyntheticEvent<HTMLImageElement, ErrorEvent>) {
    const defaultImagePath = getDefaultImagePath({
      width: 318,
      height: 256,
    });
    if (!e.target) return;
    (e.target as HTMLImageElement).src = defaultImagePath;
  }

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7 lg:col-span-8">
          <div className="h-64">
            <div className="my-4 text-black">
              <h2 className=" text-2xl capitalize">{tenKhoaHoc}</h2>
              <p className="my-2">{limitWordLength(moTa, 250)}</p>
              <div className="my-2 flex items-center gap-2">
                <p>
                  {soLuongHocVien > 1
                    ? `${soLuongHocVien.toLocaleString()} students`
                    : `${soLuongHocVien} student`}
                </p>
              </div>
              <p className="mb-2">Created by {hoTen}</p>
              <div className="flex flex-col gap-2">
                <p>Post date : {ngayTao}</p>
                <p className="flex gap-2">
                  Language:
                  <PublicIcon />
                  English , Vietnamese
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <div className={`bg-white border border-2 border-white rounded`}>
            <div>
              <img
                src={hinhAnh}
                alt={biDanh}
                className="h-64 border border-2"
                onError={handleErrorImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCourseDetail;
