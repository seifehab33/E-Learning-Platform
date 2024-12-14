import React, { Suspense, lazy } from "react";
import CourseDetailsHeader from "./CourseDetailsHeader";
import CourseInfo from "./CourseInfo";
import { LoadingWrapper } from "../FeaturedCourses/FeaturedCourses";

// Lazy load components
const CourseOverview = lazy(() => import("./CourseOverview"));
const CourseContent = lazy(() => import("./CourseContent"));
const InstructorDetails = lazy(() => import("./InstructorDetails"));

// Memoized components
const MemoizedCourseInfo = React.memo(CourseInfo);

function CourseDetails() {
  return (
    <>
      <CourseDetailsHeader />
      <div
        className="flex  px-5 xl:px-5 2xl:px-0 mx-auto max-w-[1280px] mt-[50px] flex-col lg:flex-row justify-between"
        style={{
          minHeight: "400px", // Ensure there's enough space to avoid layout shifts
          display: "flex",
          gap: "1.25rem", // You already have gap-5, ensure this is not excessive
          flexWrap: "wrap", // Avoid large shifts when the content wraps (on smaller screens)
        }}
      >
        <div className="max-w-3xl">
          <Suspense fallback={<LoadingWrapper />}>
            <CourseOverview />
            <CourseContent />
            <InstructorDetails />
          </Suspense>
        </div>
        <div>
          <MemoizedCourseInfo />
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
