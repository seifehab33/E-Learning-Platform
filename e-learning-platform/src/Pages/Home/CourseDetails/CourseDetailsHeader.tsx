import { IoIosTime } from "react-icons/io";
import banner from "../../../assets/inner-banner.jpg";
import Rating from "../../../components/Rating/Rating";
import {
  ErrorWrapper,
  LoadingWrapper,
} from "../FeaturedCourses/FeaturedCourses";
import useCourseDetails from "./useCourseDetails";
import { MdMenuBook } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
function CourseDetailsHeader() {
  const { Details, isLoading, isError } = useCourseDetails();
  if (isLoading) {
    return <LoadingWrapper />;
  }
  if (isError) {
    return <ErrorWrapper />;
  }
  return (
    <section className="course-details mt-[50px]">
      <div className="relative w-full">
        {/* Image */}
        <img
          src={banner}
          alt="Course Banner"
          className="w-full object-cover h-[400px] sm:h-[400px] md:h-[400px] lg:h-[400px] xl:h-[300px] 2xl:h-[300px]"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75"></div>

        {/* Content */}
        <div className="absolute top-16 left-0 right-0   z-10 max-w-[1280px] mx-auto text-[var(--text-color)] px-5 xl:px-5 2xl:px-0 ">
          <div className="flex flex-col lg:flex-row items-center max-w-3xl justify-between gap-5  lg:gap-10">
            <div className="flex items-center gap-5">
              <img
                src={Details?.img_inst}
                alt="Instructor"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-bold">{Details?.name_inst}</p>
                <p>{Details?.job}</p>
              </div>
              <div className="rate-course">
                <div className="flex items-center gap-1">
                  <Rating
                    rate={Details?.rate ? parseInt(Details.rate) : undefined}
                  />
                  <span className="font-bold text-[var(--text-color)] group-hover:text-white transition-colors duration-300">
                    {Details?.rate}
                  </span>
                </div>
              </div>
            </div>
            <div className="classified bg-[#ffb54c] px-4 py-2 text-white text-sm rounded-md cursor-pointer">
              <p>{Details?.classification}</p>
            </div>
          </div>
          <h1 className="text-3xl font-bold mt-5 sm:mt-6 ">
            {Details?.course}
          </h1>
          <h2 className="mt-3 sm:mt-4  lg:max-w-2xl xl:max-w-3xl md:max-w-xl text-sm">
            {Details?.conclusion}
          </h2>
          <div className="info-detail-course flex gap-5 mt-3 sm:mt-4">
            <p className="flex items-center gap-1 group-hover:text-white transition-colors duration-300 text-sm">
              <span className="text-[var(--main-color)] text-lg">
                <IoIosTime />
              </span>
              <span>{Details?.hours}</span>
            </p>
            <p className="flex items-center gap-1 group-hover:text-white transition-colors duration-300 text-sm">
              <span className="text-[var(--peach-color)] text-lg">
                <MdMenuBook />
              </span>
              <span>{Details?.lesson}</span>
            </p>
            <span className="flex items-center text-sm gap-1">
              <span className="text-[#ff875a]">
                <IoPeopleOutline className="text-lg" />
              </span>
              32 students enrolled
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseDetailsHeader;
