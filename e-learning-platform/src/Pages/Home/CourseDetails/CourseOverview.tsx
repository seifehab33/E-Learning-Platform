import {
  ErrorWrapper,
  LoadingWrapper,
} from "../FeaturedCourses/FeaturedCourses";
import useCourseDetails from "./useCourseDetails";

function CourseOverview() {
  const { Details, isLoading, isError } = useCourseDetails();
  if (isLoading) {
    return <LoadingWrapper />;
  }
  if (isError) {
    return <ErrorWrapper />;
  }
  return (
    <section className="overview ">
      <div className="bg-[var(--nav-color)] px-3 py-4 rounded-md text-[var(--text-color)] border-solid border border-gray-800 drop-shadow-lg shadow shadow-gray-900">
        <h1 className="text-xl font-extrabold">Overview</h1>
        <div className="my-1">
          <h2 className="text-[16px] mb-2 font-bold">Course Description</h2>
          <p className="text-sm text-justify font-extralight">
            {Details?.description}
          </p>
        </div>
        <div className="my-2">
          <h2 className="font-bold">What you'll learn</h2>
          <div className="px-4">
            <p className="text-sm">
              {Details?.whatlearn?.map((learn, index) => (
                <li className="text-sm" key={index}>
                  {learn}
                </li>
              ))}
            </p>
          </div>
        </div>
        <div>
          <h1 className="font-bold">Requirements</h1>
          <div className="my-2">
            <p className="text-sm">
              {Details?.requirements?.map((learn, index) => (
                <li className="px-4" key={index}>
                  {learn}
                </li>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseOverview;
