import { FaHeart, FaRegHeart } from "react-icons/fa";
import Error from "../../../components/Error/Error";
import Loading from "../../../components/Loading/Loading";
import ResuableHead from "../../../components/ResuableHead/ResuableHead";
import "./FeaturedCourses.css";
import useFeaturedCourses from "./useFeaturedCourses";
import { IoIosTime } from "react-icons/io";
import Rating from "../../../components/Rating/Rating";
import Button from "../../../components/Button/Button";
import { MdMenuBook } from "react-icons/md";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/Cart/CartSlice";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

interface CourseGridProps {
  courses: Course[];
  courseIds?: string[]; // List of course IDs to display (e.g., from the cart slice)
  favoritedIndex: number | null;
  onToggleFavorite: (index: number) => void;
  useSwiper?: boolean;
  currentPage?: number; // Optional
  itemsPerPage?: number; // Optional
  isGrid?: boolean;
  courseLayout?: boolean;
}
interface Course {
  id: string;
  img_course: string;
  job: string;
  price: string;
  discount: string;
  img_inst: string;
  name_inst: string;
  course: string;
  lesson: string;
  hours: string;
  rate: string;
}

const FavoriteButton: React.FC<{
  isFavorited: boolean;
  onToggle: () => void;
}> = ({ isFavorited, onToggle }) => (
  <div className="fav-course">
    <button
      onClick={onToggle}
      className="font-bold transition-colors duration-300 focus:outline-none"
    >
      {isFavorited ? (
        <FaHeart size={18} className="text-[var(--peach-color)]" />
      ) : (
        <FaRegHeart size={18} className="text-[var(--peach-color)]" />
      )}
    </button>
  </div>
);

export const LoadingWrapper: React.FC = () => (
  <div className="flex justify-center items-center absolute inset-0 mt-[100px] lg:mt-0">
    <Loading />
  </div>
);

export const ErrorWrapper: React.FC = () => (
  <div className="flex justify-center items-center absolute inset-0 mt-[100px] lg:mt-0">
    <Error />
  </div>
);

export const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  courseIds,
  favoritedIndex,
  onToggleFavorite,
  useSwiper = false,
  currentPage,
  itemsPerPage,
  isGrid,
  courseLayout,
}) => {
  const filteredCourses = courses.filter(
    (course) => courseIds?.includes(course.id) ?? false
  );

  const paginatedCourses =
    currentPage && itemsPerPage
      ? filteredCourses.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : filteredCourses;

  if (useSwiper) {
    return (
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
          el: ".resuable-pagination",
        }}
        modules={[Pagination]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {paginatedCourses.map((course, index) => (
          <SwiperSlide key={course.id}>
            <CourseCard
              course={course}
              index={index}
              courseLayout={courseLayout}
              favoritedIndex={favoritedIndex}
              onToggleFavorite={onToggleFavorite}
            />
          </SwiperSlide>
        ))}
        <div className="resuable-pagination mt-6"></div>
      </Swiper>
    );
  }
  return (
    <div
      className={`${
        isGrid ? "grid grid-cols-1" : "grid grid-cols-1 lg:grid-cols-3"
      } gap-2 w-full px-5 lg:px-0`}
    >
      {paginatedCourses.map((course, index) => (
        <CourseCard
          key={course.id}
          course={course}
          index={index}
          favoritedIndex={favoritedIndex}
          onToggleFavorite={onToggleFavorite}
          isGrid={isGrid}
          courseLayout={courseLayout}
        />
      ))}
    </div>
  );
};

const CourseCard: React.FC<{
  course: Course;
  index: number;
  favoritedIndex: number | null;
  onToggleFavorite: (index: number) => void;
  isGrid?: boolean;
  courseLayout?: boolean;
}> = ({
  course,
  index,
  favoritedIndex,
  onToggleFavorite,
  isGrid,
  courseLayout,
}) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const location = useLocation(); // Get the current location

  const handleDialogToggle = () => setIsDialogOpen(!isDialogOpen);
  const user = localStorage.getItem("user"); // Check if user is logged in

  // If no user is logged in, show the login prompt dialog

  const handleBuyNow = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    if (!user) {
      setDialogMessage("Please Login");
      setIsDialogOpen(true);
      return;
    }
    const isAlreadyInCart = cartItems.some(
      (item: { id: string }) => item.id === course.id
    );

    if (isAlreadyInCart) {
      setIsDialogOpen(true);
    } else {
      const newCartItem = {
        id: course.id,
        price: course.price,
        img_course: course.img_course,
        course: course.course,
        discount: course.discount,
        hours: course.hours,
        img_inst: course.img_inst,
        job: course.job,
        lesson: course.lesson,
        name_inst: course.name_inst,
        rate: course.rate,
        quantity: 1,
      };

      dispatch(addToCart(newCartItem));

      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, newCartItem])
      );
    }
  };

  const isDashboard = location.pathname === "/dashboard"; // Check if the current route is '/dashboard'

  return (
    <div
      key={course.id}
      className={`group bg-[var(--nav-color)] p-4 mx-1  mb-5 gap-3 transition-all duration-300 rounded-md  ${
        isGrid ? "flex-col lg:flex-row" : "flex-col"
      } flex relative `}
    >
      <div className="img-featured-course relative overflow-hidden transition-transform duration-300 rounded-md">
        <img
          src={course.img_course}
          alt={course.job}
          className={`${
            isGrid ? "" : ""
          } object-cover w-full h-48 transition-transform duration-500 hover:scale-110`}
        />
        {!isDashboard && (
          <p
            className={`font-bold absolute bottom-2 right-2 px-2 py-1 bg-black flex gap-2 justify-center items-center ${
              course.price === "Free"
                ? "text-green-800 group-hover:text-white"
                : "text-[var(--text-color)] group-hover:text-white"
            } rounded-md transition-colors duration-300`}
          >
            <span>{course.price}</span>
            <span className="line-through">{course.discount}</span>
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <div className="info-featured-course flex flex-col ">
          {isGrid && courseLayout && (
            <div className="name-course my-2">
              <h1 className="text-[var(--text-color)] font-bold text-xl group-hover:text-white transition-colors duration-300">
                {course.course}
              </h1>
            </div>
          )}
          <div className="info-inst flex items-center gap-2 text-[var(--text-color)]">
            <div className="img-inst">
              <img
                src={course.img_inst}
                alt={course.course}
                className="w-16 h-16 rounded-full transition-colors duration-300 group-hover:text-white"
              />
            </div>
            <div className="name-inst text-nowrap">
              <p className="group-hover:text-white transition-colors duration-300">
                {course.name_inst}
              </p>
              <p className="group-hover:text-white transition-colors duration-300">
                {course.job}
              </p>
            </div>
          </div>
          <div
            className={`${isGrid ? "absolute right-5" : "absolute right-2"}`}
          >
            <FavoriteButton
              isFavorited={favoritedIndex === index}
              onToggle={() => onToggleFavorite(index)}
            />
          </div>

          {!isGrid && (
            <div className="name-course mt-2">
              <h1 className="text-[var(--text-color)] font-bold text-sm group-hover:text-white transition-colors duration-300">
                {course.course}
              </h1>
            </div>
          )}
        </div>
        <div
          className={`${
            isGrid ? "flex flex-row" : "flex-col"
          }flex gap-3 items-center`}
        >
          <div
            className={`${
              isGrid ? "" : "mb-2"
            } flex items-center justify-between text-[var(--text-color)] text-sm gap-2`}
          >
            <p className="flex items-center gap-1 group-hover:text-white transition-colors duration-300">
              <span className="text-[var(--peach-color)] text-lg">
                <MdMenuBook />
              </span>
              <span>{course.lesson}</span>
            </p>
            <p className="flex items-center gap-1 group-hover:text-white transition-colors duration-300">
              <span className="text-[var(--main-color)] text-lg">
                <IoIosTime />
              </span>
              <span>{course.hours}</span>
            </p>
          </div>
          {!isGrid && <hr className="bg-[var(--text-color)]" />}

          <div
            className={`${
              isGrid ? "" : "mt-3"
            } buy-course flex justify-between gap-1`}
          >
            <div className="flex items-center gap-1">
              <Rating rate={parseInt(course.rate)} />
              <span className="font-bold text-[var(--text-color)] group-hover:text-white transition-colors duration-300">
                {course.rate}
              </span>
            </div>
            {!isDashboard && (
              <Button buttonText="Buy Now" onClick={handleBuyNow} />
            )}{" "}
          </div>
        </div>
        <Dialog
          placeholder=""
          onPointerEnterCapture=""
          onPointerLeaveCapture=""
          open={isDialogOpen}
          className="bg-[var(--nav-color)]"
          handler={handleDialogToggle}
        >
          <DialogHeader
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            className="text-[var(--text-color)]"
          >
            {dialogMessage === "Please Login"
              ? "Please Login"
              : "Course Already in Cart"}
          </DialogHeader>
          <DialogBody
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
            className="text-[var(--text-color)]"
          >
            {dialogMessage === "Please Login"
              ? "You need to be logged in to buy this course. Please log in to proceed."
              : `The course ${course.course} is already in your cart. You can
            proceed to checkout or continue browsing.`}
          </DialogBody>
          <DialogFooter
            placeholder=""
            onPointerEnterCapture=""
            onPointerLeaveCapture=""
          >
            <Button buttonText="Close" onClick={handleDialogToggle}></Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};
const FeaturedCourses: React.FC = () => {
  const { FeaturedCourse, isLoading, isError } = useFeaturedCourses();
  const [favoritedIndex, setFavoritedIndex] = useState<number | null>(null);

  // Use inView to trigger animation
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  const toggleFavorite = (index: number) => {
    setFavoritedIndex(favoritedIndex === index ? null : index);
  };
  const courseId = FeaturedCourse.map((course) => course.id);
  return (
    <section
      className="featured-Courses my-[100px] relative p-5"
      id="featured-Coureses"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, x: inView ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        animate={{ opacity: inView ? 1 : 0, x: 0 }}
        exit={{ opacity: 0, x: inView ? -100 : 100 }}
        transition={{ duration: 1 }}
      >
        <div className="container-main">
          <>
            <ResuableHead
              title="what's New"
              subtitle="Featured Courses"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet."
              buttonText="All Courses"
            />
          </>
        </div>
        <div className="courses-types container-main relative">
          {isLoading ? (
            <LoadingWrapper />
          ) : isError ? (
            <ErrorWrapper />
          ) : (
            <CourseGrid
              courses={FeaturedCourse}
              favoritedIndex={favoritedIndex}
              onToggleFavorite={toggleFavorite}
              courseIds={courseId}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedCourses;
