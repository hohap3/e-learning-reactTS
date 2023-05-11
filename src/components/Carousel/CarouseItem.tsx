import React, { useEffect } from "react";
import styles from "./carouselItem.module.scss";
import { Button } from "@mui/material";
import { useSwiper } from "swiper/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "animate.css";

interface Props {
  imageSource?: string;
  title?: string;
}

function CarouseItem({ imageSource, title }: Props) {
  const swiper = useSwiper();

  return (
    <div className={`${styles["carousel-item"]}`}>
      <div>
        <img className="w-full" src={imageSource} alt="carousel item" />
        <div className={`${styles["carousel-overlay"]}`}>
          <div className="container mx-auto flex">
            <div className="justify-start w-[60%]">
              <h5 className="uppercase text-[1.2rem] text-[#06bbcc] font-semibold mb-3">
                Best Online Course
              </h5>
              <h1 className="animate__animated animate__fadeInDown text-white text-[4rem] capitalize text-bold line leading-tight">
                {title}
              </h1>
              <p className="text-white text-[1.25rem] mt-2 mb-6">
                Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam
                no. Kasd rebum ipsum et diam justo clita et kasd rebum sea
                sanctus eirmod elitr.
              </p>

              <div
                className={`${styles["carousel-action"]} flex items-center gap-4`}
              >
                <Button
                  className={`${styles["carousel-action-button"]} ${styles["primary"]} animate__animated animate__fadeInLeft`}
                >
                  Read more
                </Button>
                <Button
                  className={`${styles["carousel-action-button"]} animate__animated animate__fadeInRight`}
                >
                  Join now
                </Button>
              </div>
            </div>
            <div className={`${styles["carousel-navigate"]} w-[40%]`}>
              <div className="absolute top-[50%] right-[4rem] translate-y-[-50%]">
                <div className="mb-4">
                  <Button onClick={() => swiper.slidePrev()}>
                    <ChevronLeftIcon />
                  </Button>
                </div>
                <div>
                  <Button onClick={() => swiper.slideNext()}>
                    <ChevronRightIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouseItem;