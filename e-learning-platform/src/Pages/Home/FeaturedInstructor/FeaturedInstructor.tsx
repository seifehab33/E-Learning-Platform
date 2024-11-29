import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import UseFeaturedInstructor from "./UseFeaturedInstructor";
import { useRef, useEffect, useState, useMemo } from "react";
import notfound from "../../../assets/not-found.png";
import { PiStudent } from "react-icons/pi";

import "./SwiperInst.css";
import {
  ErrorWrapper,
  LoadingWrapper,
} from "../FeaturedCourses/FeaturedCourses";

function FeaturedInstructor() {
  const { FeaturedInst, isLoading, isError } = UseFeaturedInstructor();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Memoize slide elements to prevent re-renders
  const slidesInst = useMemo(
    () =>
      FeaturedInst.map((finst) => (
        <motion.div
          key={finst.id}
          initial={{ x: -100, opacity: 0 }}
          animate={hasAnimated ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.3 }}
          className="bg-[#2A2438] p-5 rounded-lg shadow-lg text-white hover:bg-[#221c30] transition-all duration-300 ease-in mt-10"
        >
          <div className="img-category flex justify-center mb-4 transition-transform duration-300 overflow-hidden">
            <img
              src={finst.img_inst}
              alt={finst.name_inst}
              loading="lazy" // Lazy load images
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).onerror = null;
                e.currentTarget.src = notfound;
              }}
              className="transition-transform duration-500 ease-in-out hover:scale-110 object-cover"
            />
          </div>
          <div className="text-box text-center flex flex-col gap-5 text-[var(--text-color)]">
            <p className="text-xl">{finst.name_inst}</p>
            <p className="text-sm">{finst.job}</p>
            <p className="flex items-center justify-center gap-3">
              <span className="text-[var(--peach-color)]">
                <PiStudent size={20} />
              </span>
              <span>{finst.students}</span>
            </p>
          </div>
        </motion.div>
      )),
    [FeaturedInst, hasAnimated]
  );

  return (
    <section className="my-10 p-5" ref={ref}>
      <div className="head-featurd-inst flex items-center justify-center text-[var(--text-color)] flex-col gap-5">
        <h1 className="text-4xl">Featured Instructor</h1>
        <p className="text-sm max-w-2xl text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
          accumsan bibendum gravida maecenas augue elementum et neque.
          Suspendisse imperdiet.
        </p>
      </div>

      <div className="container-main relative">
        {isLoading ? (
          <LoadingWrapper />
        ) : isError ? (
          <ErrorWrapper />
        ) : (
          <Swiper
            slidesPerView={1} // Default to 1 slide per view
            spaceBetween={30}
            pagination={{
              clickable: true,
              el: ".finst-pagination",
            }}
            modules={[Pagination]}
            className="mySwiper"
            breakpoints={{
              640: { slidesPerView: 2 }, // 2 slides for small screens
              768: { slidesPerView: 3 }, // 3 slides for medium screens
              1024: { slidesPerView: 4 }, // 4 slides for large screens
            }}
          >
            {slidesInst.map((slide, index) => (
              <SwiperSlide key={index}>{slide}</SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="finst-pagination"></div>
      </div>
    </section>
  );
}

export default FeaturedInstructor;
