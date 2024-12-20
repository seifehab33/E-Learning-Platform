import React, { Suspense, lazy, useEffect, useState } from "react";
import CourseDetailsHeader from "./CourseDetailsHeader";
import CourseInfo from "./CourseInfo";
import { LoadingWrapper } from "../FeaturedCourses/FeaturedCourses";
import { FaUnlock } from "react-icons/fa";

const CourseOverview = lazy(() => import("./CourseOverview"));
const CourseContent = lazy(() => import("./CourseContent"));
const InstructorDetails = lazy(() => import("./InstructorDetails"));

const MemoizedCourseInfo = React.memo(CourseInfo);

const getUserEmailFromLocalStorage = (): string | null => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return user.email || null;
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      return null;
    }
  }
  return null;
};

function CourseDetails() {
  const [isDemoUser, setIsDemoUser] = useState(false);

  useEffect(() => {
    const userEmail = getUserEmailFromLocalStorage();
    setIsDemoUser(userEmail === "demo@email.com");
  }, []);

  const handleLock = () => {
    alert("Only Real User Unlock The Content !");
  };

  return (
    <>
      <CourseDetailsHeader />
      <div
        className="flex px-5 xl:px-5 2xl:px-0 mx-auto max-w-[1280px] mt-[50px] flex-col lg:flex-row justify-between relative"
        style={{
          minHeight: "400px",
          display: "flex",
          gap: "1.25rem",
          flexWrap: "wrap",
        }}
      >
        {isDemoUser && (
          <div
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
            style={{ zIndex: 10 }}
          >
            <div className="bg-white p-8 rounded-md shadow-lg">
              <h2 className="text-xl font-semibold">Unlock the Content</h2>
              <div className="flex justify-center items-center">
                <button
                  onClick={handleLock}
                  className="mt-4 px-6 py-2 text-white rounded text-center flex gap-2 items-center bg-[var(--peach-color)]"
                >
                  <FaUnlock /> Unlock Now
                </button>
              </div>
            </div>
          </div>
        )}
        <div
          className={`max-w-3xl ${isDemoUser ? "filter blur-lg" : ""}`}
          style={{
            position: "relative",
          }}
        >
          <Suspense fallback={<LoadingWrapper />}>
            <CourseOverview />
            <CourseContent />
            <InstructorDetails />
          </Suspense>
        </div>
        <div className={`${isDemoUser ? "filter blur-lg" : ""}`}>
          <MemoizedCourseInfo />
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
