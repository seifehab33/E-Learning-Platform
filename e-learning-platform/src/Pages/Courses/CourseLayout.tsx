import { useState } from "react";
import Search from "../../components/Search/Search";
import CourseCategories from "./CourseCategories";
import CouseCard from "./CouseCard";
import { GridProvider } from "../../Context/GridContext";

function CourseLayout() {
  const [checkedCourses, setCheckedCourses] = useState<{
    [key: string]: boolean;
  }>({});
  const [checkedInstructors, setCheckedInstructors] = useState<{
    [key: string]: boolean;
  }>({});

  const handleCourseFilterChange = (course: string) => {
    setCheckedCourses((prev) => ({
      ...prev,
      [course]: !prev[course],
    }));
  };

  const handleInstructorFilterChange = (instructor: string) => {
    setCheckedInstructors((prev) => ({
      ...prev,
      [instructor]: !prev[instructor],
    }));
  };

  return (
    <GridProvider>
      <>
        <div className="head-course-search mt-[100px] mb-10 mx-5">
          <Search />
        </div>
        <div className="flex flex-col lg:flex-row max-w-[1280px] mx-auto">
          <div className="w-full">
            <CouseCard
              selectedCourses={checkedCourses}
              selectedInstructors={checkedInstructors}
            />
          </div>
          <CourseCategories
            checkedCourses={checkedCourses}
            checkedInstructors={checkedInstructors}
            onCourseChange={handleCourseFilterChange}
            onInstructorChange={handleInstructorFilterChange}
          />
        </div>
      </>
    </GridProvider>
  );
}

export default CourseLayout;
