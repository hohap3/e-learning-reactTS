import React, { useEffect } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import StudentTestimonialItem from "./StudentTestimonialItem";
import { useAppSelector } from "app/hooks";
import { selectUserListTestimonial } from "redux/User/userSlice";
import "swiper/css";
import "swiper/css/effect-fade";

function StudentTestimonial() {
  const userListTestimonial = useAppSelector(selectUserListTestimonial);

  return (
    <section className="container mx-auto">
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        loop
        modules={[Pagination, Autoplay]}
        speed={1000}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        centeredSlides
      >
        {userListTestimonial?.map((user, idx) => (
          <SwiperSlide key={idx}>
            {({ isActive }) => (
              <StudentTestimonialItem
                name={user.hoTen}
                description={"Student"}
                avatar={user.image}
                isActive={isActive}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default StudentTestimonial;
