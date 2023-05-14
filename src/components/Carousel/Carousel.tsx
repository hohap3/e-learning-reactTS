import React from "react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/bundle";
import CarouseItem from "./CarouseItem";

import carousel1 from "assets/carousel/carousel-1.jpg";
import carousel2 from "assets/carousel/carousel-2.jpg";

function Carousel() {
  return (
    <div className="mt-[74px] mb-[3rem] md:h-auto">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        loop
        speed={1800}
        modules={[Navigation, Autoplay]}
      >
        <SwiperSlide>
          <CarouseItem
            imageSource={carousel1}
            title="Get educated online from your home"
          />
        </SwiperSlide>
        <SwiperSlide>
          <CarouseItem
            imageSource={carousel2}
            title="The best online learning platform"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Carousel;
