import PersonIcon from "@mui/icons-material/Person";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import LoadingCircle from "components/LoadingCircle/LoadingCircle";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseItem } from "../../models";
import { getDefaultImagePath, limitWordLength } from "../../utils";
import styles from "./courseItem.module.scss";

interface Props {
  courseItem: CourseItem;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function CourseItemLayout({ courseItem }: Props) {
  const [value, setValue] = useState<number>(4.4); //star value
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const courseItemRef = useRef<null | HTMLDivElement>(null);

  const imageRef = useRef<null | HTMLImageElement>(null);

  // default image thumbnail when image link is not available

  useEffect(() => {
    function handleErrorImage(e: any) {
      if (!courseItemRef.current) return;
      const { target } = e;
      const defaultImagePath = getDefaultImagePath({
        width: courseItemRef.current.clientWidth,
        height: 314,
      });

      target.src = defaultImagePath;
    }

    imageRef.current &&
      imageRef.current.addEventListener("error", handleErrorImage);

    return () => {
      imageRef.current &&
        imageRef.current.removeEventListener("error", handleErrorImage);
    };
  }, []);

  useEffect(() => {
    if (!courseItemRef.current) return;

    function handleClickToMove(e: Event) {
      if (!(e.target instanceof Element)) return;

      if (e.target.tagName === "BUTTON") return;

      navigate(`/course-item/${maKhoaHoc}`);
    }

    courseItemRef.current.addEventListener("click", handleClickToMove);
  }, []);

  if (!courseItem)
    return (
      <div>
        <LoadingCircle />
      </div>
    );

  const {
    hinhAnh,
    luotXem,
    tenKhoaHoc,
    moTa,
    ngayTao,
    maKhoaHoc,

    nguoiTao: { hoTen },
  } = courseItem;

  return (
    <section
      ref={courseItemRef}
      className={`${styles["course-item"]} shadow text-[#333] cursor-pointer `}
    >
      <div className={`${styles["course-item-img"]} relative overflow-hidden`}>
        <img
          ref={imageRef}
          src={hinhAnh}
          alt={tenKhoaHoc}
          className="w-full h-[315px]"
        />

        <div className={`${styles["course-item-access"]} absolute`}>
          <button onClick={() => setOpen(true)}>Read More</button>
          <button onClick={() => navigate(`/course-item/${maKhoaHoc}`)}>
            Join Now
          </button>
        </div>
      </div>
      <div className={`${styles["course-item-detail"]}`}>
        <div className="px-2 pt-2 lg:px-6 lg:pt-6 text-center">
          <div className={`${styles["course-item-ranting"]} my-2`}>
            <Rating
              value={value}
              precision={0.1}
              readOnly
              sx={{ color: "#06bbcc" }}
            />
          </div>

          <h2 className="capitalize text-xl font-medium h-[56px]">
            {limitWordLength(tenKhoaHoc, 36)}
          </h2>
          <p> Date: {ngayTao}</p>
        </div>
        <div className={`${styles["course-item-footer"]} mt-6`}>
          <div className="grid grid-cols-12 gap-0 border border-t-2">
            <div className="col-span-4">
              <div className="flex items-center gap-2 py-2 justify-center">
                <div className={`${styles["course-item-footer-icon"]}`}>
                  <PersonIcon sx={{ color: "#06bbcc" }} />
                </div>
                <p className="text-[12px] lg:text-base">
                  {limitWordLength(hoTen, 10)}
                </p>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex items-center gap-2 py-2 justify-center border border-x-2 border-t-0 border-b-0">
                <div className={`${styles["course-item-footer-icon"]}`}>
                  <WatchLaterIcon sx={{ color: "#06bbcc" }} />
                </div>
                <p className="text-[12px] lg:text-base">5.0 Hrs</p>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex items-center gap-2 py-2 justify-center">
                <div className={`${styles["course-item-footer-icon"]}`}>
                  <RemoveRedEyeIcon sx={{ color: "#06bbcc" }} />
                </div>
                <p className="text-[12px] lg:text-base">{luotXem} Views</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <p>Course Name : {tenKhoaHoc}</p>
          <p>Release Date : {ngayTao}</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Description:
            <p>{moTa}</p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default CourseItemLayout;
