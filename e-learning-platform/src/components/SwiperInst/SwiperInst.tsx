import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./SwiperInst.css";
import React from "react";

interface SwiperProps {
  slidesPerView: number;
  spaceBetween: number;
  breakpoints: {
    [key: number]: {
      slidesPerView: number;
    };
  };
  slides: React.JSX.Element[];
}

function SwiperInst({
  slidesPerView,
  spaceBetween,
  breakpoints,
  slides,
}: SwiperProps) {
  return (
    <div className="relative container-main">
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        pagination={{
          clickable: true,
          el: ".finst-pagination",
        }}
        modules={[Pagination]}
        breakpoints={breakpoints}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>
      <div className="finst-pagination"></div>
    </div>
  );
}

export default SwiperInst;
