import useCourseDetails from "./useCourseDetails";
import Rating from "../../../components/Rating/Rating";
import {
  ErrorWrapper,
  LoadingWrapper,
} from "../FeaturedCourses/FeaturedCourses";
import { IoIosTime } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { AiOutlinePlayCircle } from "react-icons/ai";

function InstructorDetails() {
  const { Details, isLoading, isError } = useCourseDetails();
  if (isLoading) {
    <LoadingWrapper />;
  }
  if (isError) {
    <ErrorWrapper />;
  }
  return (
    <section className="insturctor-details ">
      <div className="bg-[var(--nav-color)] px-3 py-4 max-w-3xl rounded-md text-[var(--text-color)] border-solid border border-gray-800 drop-shadow-lg shadow shadow-gray-900">
        <h1 className="text-xl font-bold">About the instructor</h1>

        <div className="my-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={Details?.img_inst}
                className="w-12 h-12 rounded-full object-cover"
                alt=""
              />
              <div>
                <h1>{Details?.name_inst}</h1>
                <p>{Details?.job}</p>
              </div>
            </div>
            <div className="flex items-center text-sm gap-2">
              <Rating
                rate={Details?.rate ? parseInt(Details.rate) : undefined}
              />
              <p className="">
                <span>{Details?.rate} </span>Instructor Rating
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="info-detail-course flex gap-5 mt-3 sm:mt-4 my-4">
          <p className="flex items-center gap-1 group-hover:text-white transition-colors duration-300 text-sm">
            <AiOutlinePlayCircle
              size={20}
              className="text-[var(--yellow-color)]"
            />
            <span>5 Courses</span>
          </p>
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
            250,589 students enrolled
          </span>
        </div>
        <hr />
        <div className="skills-inst my-3 text-sm">
          <p className="my-2">
            {Details?.course} ,
            <span>
              {" "}
              with 7+ Years Experience. Guarantee of High Quality Work.
            </span>
          </p>
          <p className="my-2">
            <span className="font-bold">Skills:</span> Web Design, UI Design,
            UX/UI Design, Mobile Design, User Interface Design, Sketch,
            Photoshop, GUI, Html, Css, Grid Systems, Typography, Minimal,
            Template, English, Bootstrap, Responsive Web Design, Pixel Perfect,
            Graphic Design, Corporate, Creative, Flat, Luxury and much more.
          </p>
          <div>
            <h2 className="mb-5">Available for:</h2>
            <ul>
              <li>1. Full Time Office Work</li>
              <li>2. Remote Work</li>
              <li>3. Freelance</li>
              <li>4. Contract</li>
              <li>5. Worldwide</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstructorDetails;
