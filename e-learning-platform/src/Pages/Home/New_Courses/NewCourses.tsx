import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ResuableHead from "../../../components/ResuableHead/ResuableHead";
import {
  CourseGrid,
  ErrorWrapper,
  LoadingWrapper,
} from "../FeaturedCourses/FeaturedCourses";
import useNewCourses from "./useNewCourses";
function NewCourses() {
  const { New_Courses, isLoading, isError } = useNewCourses();
  const [favoritedIndex, setFavoritedIndex] = useState<number | null>(null);
  const toggleFavorite = (index: number) => {
    setFavoritedIndex(favoritedIndex === index ? null : index);
  };
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <section className="new_courses my-10 p-5" ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="container-main">
          <>
            <ResuableHead
              title="What's New"
              subtitle="TRENDING COURSES"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet."
              buttonText="All Courses"
            />
          </>
        </div>
        <div className="container-main relative">
          {isLoading ? (
            <LoadingWrapper />
          ) : isError ? (
            <ErrorWrapper />
          ) : (
            <CourseGrid
              courses={New_Courses}
              onToggleFavorite={toggleFavorite}
              favoritedIndex={favoritedIndex}
              useSwiper={true}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default NewCourses;
