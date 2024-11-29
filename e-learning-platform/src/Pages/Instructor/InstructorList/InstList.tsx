import React, { useState } from "react";
import InstructorCard from "./InstructorCard";
import { useGrid } from "../../../Context/useGrid";
import {
  LoadingWrapper,
  ErrorWrapper,
} from "../../Home/FeaturedCourses/FeaturedCourses";
import InstructorFilters from "./InstructorsFilters";
import { Instructor } from "../Types/Types";
import useInstructorList from "../InstructorHooks/useInstructorList";

const InstructorList: React.FC = () => {
  const { isLoading, isError } = useInstructorList();
  const {
    isGrid,
    currentPage,
    itemsPerPage,
    totalPages,
    updatePage,
    SearchedInst,
  } = useGrid();
  const [checkedCourses, setCheckedCourses] = useState<{
    [key: string]: boolean;
  }>({});
  const [checkedInstructors, setCheckedInstructors] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(
    null
  );

  // Filtering logic
  const filterByInstructorNames = (instructors: Instructor[]) => {
    return instructors.filter((instructor) => {
      const selectedNames = Object.keys(checkedInstructors).filter(
        (name) => checkedInstructors[name]
      );
      return (
        selectedNames.length === 0 ||
        selectedNames.includes(instructor.name_inst)
      );
    });
  };

  const filterByCourses = (instructors: Instructor[]) => {
    return instructors.filter((instructor) => {
      const selectedCourses = Object.keys(checkedCourses).filter(
        (course) => checkedCourses[course]
      );
      return (
        selectedCourses.length === 0 ||
        instructor.courses.some((course) =>
          selectedCourses.some((selectedCourse) =>
            course.toLowerCase().includes(selectedCourse.toLowerCase())
          )
        )
      );
    });
  };

  const combinedFilter = () => {
    const filteredBySearch = SearchedInst;
    const filteredByNames = filterByInstructorNames(filteredBySearch);
    return filterByCourses(filteredByNames);
  };

  const filteredInstructors = combinedFilter();
  const indexOfLastInstructor = currentPage * itemsPerPage;
  const currentInstructors = filteredInstructors.slice(
    indexOfLastInstructor - itemsPerPage,
    indexOfLastInstructor
  );

  const handleInstructorSelect = (name: string) =>
    setSelectedInstructor(selectedInstructor === name ? null : name);

  if (isLoading) return <LoadingWrapper />;
  if (isError) return <ErrorWrapper />;

  return (
    <div className="p-4 my-10">
      <div className="flex flex-col lg:flex-row max-w-[1280px] mx-auto gap-5 items-start">
        <div
          className={`${
            isGrid
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2"
              : "grid grid-cols-1"
          } gap-4 w-full`}
        >
          {currentInstructors.map((instructor: Instructor) => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
              isGrid={isGrid}
              onSelect={() => handleInstructorSelect(instructor.name_inst)}
              selected={selectedInstructor === instructor.name_inst}
            />
          ))}
        </div>
        <InstructorFilters
          checkedCourses={checkedCourses}
          setCheckedCourses={setCheckedCourses}
          checkedInstructors={checkedInstructors}
          setCheckedInstructors={setCheckedInstructors}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => updatePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-[var(--peach-color)] text-white rounded-md hover:bg-[var(--peach-dark-color)] border-[var(--peach-color)] border hover:border-[var(--peach-color)] hover:border-solid hover:border transition-all duration-300 ease-in-out"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
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
        ))}
        <button
          onClick={() => updatePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-[var(--peach-color)] text-white rounded-md hover:bg-[var(--peach-dark-color)] border-[var(--peach-color)] border hover:border-[var(--peach-color)] hover:border-solid hover:border transition-all duration-300 ease-in-out"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InstructorList;
