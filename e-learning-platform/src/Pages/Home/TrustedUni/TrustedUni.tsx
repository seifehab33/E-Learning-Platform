import { TrustedData } from "./Trusted";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";

function TrustedUni() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.section
      className="my-10 p-5"
      ref={ref}
      initial={{ x: "-100px", opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="flex flex-col text-center items-center justify-center">
        <h1 className="text-[var(--peach-color)] text-xl font-bold">
          Trusted By
        </h1>
        <p className="text-3xl text-[var(--text-color)]">
          500+ Leading Universities And Companies
        </p>
      </div>
      <div className="container-main">
        <Swiper
          spaceBetween={20}
          slidesPerView={6}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          className=" mt-20"
          breakpoints={{
            320: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {TrustedData.map((trust) => (
            <SwiperSlide key={trust.id}>
              <img
                src={trust.img}
                alt=""
                className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
}

export default TrustedUni;
