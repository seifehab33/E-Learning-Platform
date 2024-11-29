import {
  CourseGrid,
  ErrorWrapper,
  LoadingWrapper,
} from "../Home/FeaturedCourses/FeaturedCourses";
import CourseApiHook from "./CourseApiHook/CourseApiHook";
import { useGrid } from "../../Context/useGrid";
import { useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion

interface CourseCardProps {
  selectedCourses: { [key: string]: boolean };
  selectedInstructors: { [key: string]: boolean };
}

function CourseCard({ selectedCourses, selectedInstructors }: CourseCardProps) {
  const {
    currentPage,
    itemsPerPage,
    updatePage,
    totalInstructors,
    searchTerm,
    isGrid,
  } = useGrid();
  const { Courses, isLoading, isError } = CourseApiHook();
  const [favoritedIndex, setFavoritedIndex] = useState<number | null>(null);
  const courseId = Courses.map((course) => course.id);
  const filteredCourses = Courses.filter((course) => {
    const courseInstructor = course.name_inst;
    const isInstructorSelected = selectedInstructors[courseInstructor];

    const isCourseSelected = Object.keys(selectedCourses).some(
      (courseKey) =>
        selectedCourses[courseKey] &&
        course.course.toLowerCase().includes(courseKey.toLowerCase())
    );

    const isCourseMatchingSearch = course.course
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      (isInstructorSelected ||
        !Object.values(selectedInstructors).some(Boolean)) &&
      (isCourseSelected || !Object.values(selectedCourses).some(Boolean)) &&
      (isCourseMatchingSearch || searchTerm === "")
    );
  });

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const toggleFavorite = (index: number) => {
    setFavoritedIndex(favoritedIndex === index ? null : index);
  };

  return (
    <div className="courses-types relative max-w-5xl">
      {isLoading ? (
        <LoadingWrapper />
      ) : isError ? (
        <ErrorWrapper />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Start from the left
            animate={{ opacity: 1, x: 0 }} // Move to the normal position
            transition={{ duration: 1.2 }} // Animation duration
          >
            <CourseGrid
              isGrid={isGrid}
              courses={currentCourses}
              favoritedIndex={favoritedIndex}
              onToggleFavorite={toggleFavorite}
              courseLayout={true}
              courseIds={courseId}
              purchasedCourses={currentCourses}
            />
          </motion.div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => updatePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 bg-[var(--peach-color)] text-white rounded-md hover:bg-[var(--peach-dark-color)] border-[var(--peach-color)] border transition-all duration-300 ease-in-out"
            >
              Previous
            </button>
            {Array.from(
              { length: Math.ceil(totalInstructors / itemsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => updatePage(index + 1)}
                  className={`px-4 py-2 mx-1 ${
                    currentPage === index + 1
                      ? "bg-[var(--peach-color)] text-white"
                      : "border border-[var(--peach-color)] text-white font-bold"
                  } rounded-md`}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              onClick={() => updatePage(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(totalInstructors / itemsPerPage)
              }
              className="px-4 py-2 mx-1 bg-[var(--peach-color)] text-white rounded-md hover:bg-[var(--peach-dark-color)] border-[var(--peach-color)] border transition-all duration-300 ease-in-out"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CourseCard;
