import { useRef } from "react";
import notfound from "../../../assets/not-found.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Category.css";
import { Pagination } from "swiper/modules";
import useCategory from "./useCategory";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error/Error";
import ResuableHead from "../../../components/ResuableHead/ResuableHead";
import { motion, useInView } from "framer-motion";

function Category() {
  const { categories, isLoading, isError } = useCategory();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="category my-10 p-5" ref={ref}>
      <div className="container-main">
        <>
          <ResuableHead
            title="Favourite Course"
            buttonText="All Category"
            subtitle="Top Category"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet."
          />
        </>
      </div>
      <div className="category-types container-main relative">
        {isLoading ? (
          <div className="flex justify-center items-center absolute inset-0 mt-[100px] lg:mt-0">
            <Loading />
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center absolute inset-0 mt-[100px] lg:mt-0">
            <Error />
          </div>
        ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
              el: ".category-pagination",
            }}
            modules={[Pagination]}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              320: {
                slidesPerView: 1,
              },
            }}
            className="mySwiper"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 1.3 }}
                  className="bg-[#2A2438] p-5 rounded-lg shadow-lg text-white hover:bg-[#221c30] transition-colors duration-300 ease-in"
                >
                  <div className="img-category flex justify-center mb-4">
                    <img
                      src={category.img}
                      alt={category.category}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = notfound;
                      }}
                      className="w-28 h-28 bg-white rounded-full p-3 transition-transform duration-300 ease-in-out hover:scale-110" // Scale image on hover
                    />
                  </div>
                  <div className="text-box text-center flex flex-col gap-5">
                    <p className="text-lg font-semibold text-center flex flex-col">
                      {category.category.split(" ")[0]}{" "}
                      <span className="block">
                        {category.category.split(" ")[1]}
                      </span>
                    </p>
                    <p className="text-sm">{category.no_inst} Instructors</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="category-pagination"></div>
    </section>
  );
}

export default Category;
