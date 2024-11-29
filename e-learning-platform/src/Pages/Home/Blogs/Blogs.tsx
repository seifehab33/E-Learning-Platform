import { useRef, useEffect, useState } from "react";
import useBlogs from "./useBlogs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import notfound from "../../../assets/not-found.png";
import { SlCalender } from "react-icons/sl";
import {
  ErrorWrapper,
  LoadingWrapper,
} from "../FeaturedCourses/FeaturedCourses";
import "swiper/css";
import "swiper/css/pagination";
import "./Blogs.css";
import { motion, useInView } from "framer-motion";

function Blogs() {
  const { BlogsData, isLoading, isError } = useBlogs();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const slidesBlog = BlogsData.map((blog) => (
    <SwiperSlide key={blog.id}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.3 }}
        className="bg-[#2A2438] rounded-md shadow-md pb-3 text-white hover:bg-[#221c30] transition-transform duration-300 ease-in-out mt-6"
      >
        <div className="mb-3 overflow-hidden rounded-md border border-gray-800 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg max-w-full">
          <img
            src={blog.img}
            alt={blog.type}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).onerror = null;
              e.currentTarget.src = notfound;
            }}
            className="w-full max-w-full transform transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
        <div className="text-box text-center flex flex-col gap-3 text-[var(--text-color)] px-3">
          <p className="text-[14px] font-semibold">{blog.name}</p>
          <p className="text-xs text-gray-400">{blog.type}</p>
          <p className="flex items-center justify-center gap-2 text-gray-300 text-sm">
            <span className="text-[var(--peach-color)]">
              <SlCalender size={18} />
            </span>
            <span>{blog.date}</span>
          </p>
        </div>
      </motion.div>
    </SwiperSlide>
  ));

  return (
    <section className="my-8 p-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="head-blogs text-[var(--text-color)] mb-6 flex flex-col justify-center items-center"
      >
        <h1 className="text-5xl">Latest Blogs</h1>
        <p className="max-w-2xl text-center text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
          accumsan bibendum gravida maecenas augue elementum et neque.
          Suspendisse imperdiet.
        </p>
      </motion.div>

      <div className="container-main relative">
        {isLoading ? (
          <LoadingWrapper />
        ) : isError ? (
          <ErrorWrapper />
        ) : (
          <Swiper
            modules={[Pagination]}
            spaceBetween={15}
            slidesPerView={4} // Default to 1 slide per view for very small screens
            pagination={{ clickable: true, el: ".blog-pagination" }}
            breakpoints={{
              340: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              940: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="mySwiper"
          >
            {slidesBlog}
          </Swiper>
        )}
        <div className="blog-pagination"></div>
      </div>
    </section>
  );
}

export default Blogs;
