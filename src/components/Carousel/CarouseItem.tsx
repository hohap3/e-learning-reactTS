import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { useSwiper } from "swiper/react";
import styles from "./carouselItem.module.scss";

interface Props {
  imageSource?: string;
  title?: string;
}

function CarouseItem({ imageSource, title }: Props) {
  const swiper = useSwiper();
  const navigate = useNavigate();

  return (
    <div className={`${styles["carousel-item"]} overflow-hidden`}>
      <div>
        <img className="w-full h-full" src={imageSource} alt="carousel item" />
        <div className={`${styles["carousel-overlay"]}`}>
          <div className="container mx-auto flex">
            <div className="justify-start w-[80%] md:w-[60%] lg:px-0 px-2 md:px-6">
              <h5 className="uppercase text-[0.4rem] md:text-[1rem] lg:text-[1.2rem] text-[#06bbcc] font-semibold mb-3">
                Best Online Course
              </h5>
              <h1 className="animate__animated animate__fadeInDown text-white text-[1rem] md:text-[1.8rem] lg:text-[4rem] capitalize text-bold line leading-tight">
                {title}
              </h1>
              <p className="text-white text-[0.6rem] md:text-[1rem] lg:text-[1.25rem] mt-2 mb-6">
                Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam
                no. Kasd rebum ipsum et diam justo clita et kasd rebum sea
                sanctus eirmod elitr.
              </p>

              <div
                className={`${styles["carousel-action"]} flex items-center gap-4`}
              >
                <Button
                  className={`${styles["carousel-action-button"]} ${styles["primary"]} animate__animated animate__fadeInLeft text-[12px] md:text-nase`}
                >
                  Read more
                </Button>
                <Button
                  className={`${styles["carousel-action-button"]} animate__animated animate__fadeInRight`}
                  onClick={() => navigate("/signIn")}
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
