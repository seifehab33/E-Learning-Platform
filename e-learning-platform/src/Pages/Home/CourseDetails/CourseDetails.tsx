import CourseContent from "./CourseContent";
import CourseDetailsHeader from "./CourseDetailsHeader";
import CourseInfo from "./CourseInfo";
import CourseOverview from "./CourseOverview";
import InstructorDetails from "./InstructorDetails";

function CourseDetails() {
  return (
    <>
      <CourseDetailsHeader />
      <div className=" flex gap-5 px-5 xl:px-5 2xl:px-0 mx-auto max-w-[1280px] mt-[50px] flex-col lg:flex-row">
        <div className="max-w-3xl">
          <CourseOverview />
          <CourseContent />
          <InstructorDetails />
        </div>
        <div>
          <CourseInfo />
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
