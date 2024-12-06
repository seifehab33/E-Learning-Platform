import { CiHeart } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";
import video from "../../../assets/video-course.png";
import {
  ErrorWrapper,
  LoadingWrapper,
} from "../FeaturedCourses/FeaturedCourses";
import useCourseDetails from "./useCourseDetails";
import React, { useMemo } from "react";
import { IoMdDownload } from "react-icons/io";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaCloudDownloadAlt, FaKey } from "react-icons/fa";
import { MdDevices } from "react-icons/md";
import { SlGraduation } from "react-icons/sl";
import { IoPeopleOutline } from "react-icons/io5";
import { BiTimeFive, BiBookAlt, BiBarChart } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectPurchasedItems } from "../../../features/Cart/PurchasedSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../Store/store";
import { addToCart } from "../../../features/Cart/CartSlice";
// Discount calculation function
function calculateDiscountPercentage(price: string, discount: string): string {
  // Remove dollar signs and parse to numbers
  const priceNum = parseFloat(price.replace("$", ""));
  const discountNum = parseFloat(discount.replace("$", ""));

  // Validate parsed numbers
  if (
    isNaN(priceNum) ||
    isNaN(discountNum) ||
    priceNum <= 0 ||
    discountNum <= 0 ||
    discountNum >= priceNum
  ) {
    return "0%";
  }

  // Calculate percentage
  const percentage = ((priceNum - discountNum) / priceNum) * 100;
  return `${Math.round(percentage)}%`;
}
const includes = [
  { id: 1, icon: <IoMdDownload />, text: "11 hours on-demand video" },
  { id: 2, icon: <AiOutlinePlayCircle />, text: "69 downloadable resources" },
  { id: 3, icon: <FaKey />, text: "Full lifetime access" },
  { id: 4, icon: <MdDevices />, text: "Access on mobile and TV" },
  { id: 5, icon: <FaCloudDownloadAlt />, text: "Assignments" },
  { id: 6, icon: <SlGraduation />, text: "Certificate of Completion" },
];
function CourseInfo() {
  const { Details, isLoading, isError } = useCourseDetails();
  const purchasedItems = useSelector(selectPurchasedItems);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleEnrollClick = () => {
    const courseId = Details?.id;

    // Check if the course is already in purchasedItems
    const isPurchased = purchasedItems.some((item) => item.id === courseId);

    if (isPurchased) {
      alert("You are already enrolled in this course.");
    } else {
      const newCartItem = {
        id: Details?.id ?? "",
        price: Details?.price ?? "0",
        img_course: Details?.img_course ?? "",
        course: Details?.course ?? "",
        discount: Details?.discount ?? "0",
        hours: Details?.hours ?? "0",
        img_inst: Details?.img_inst ?? "",
        job: Details?.job ?? "",
        lesson: Details?.lesson ?? "",
        name_inst: Details?.name_inst ?? "",
        rate: Details?.rate ?? "0",
        quantity: 1,
      };

      dispatch(addToCart(newCartItem));

      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, newCartItem])
      );

      navigate("/cart/:id");
    }
  };
  const discountPercentage = useMemo(() => {
    if (!Details?.price || !Details?.discount) return "0%";
    return calculateDiscountPercentage(Details.price, Details.discount);
  }, [Details?.price, Details?.discount]);

  if (isLoading) return <LoadingWrapper />;
  if (isError) return <ErrorWrapper />;

  return (
    <>
      <div className="video-course w-full flex justify-center mt-0  lg:-mt-72">
        <div className="w-full bg-[var(--nav-color)] px-3 max-w-3xl z-20 py-4 rounded-md text-[var(--text-color)] border border-gray-800 drop-shadow-lg shadow shadow-gray-900">
          <div>
            <div className="mb-4">
              <img
                src={video}
                className="w-full rounded-md"
                alt="Course Video Thumbnail"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-lg">{`${Details?.discount}`}</p>
              <div className="flex items-center gap-1 text-sm">
                <p className="line-through text-gray-400">{`${Details?.price}`}</p>
                <p className="text-gray-400">{discountPercentage} Off</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                className="border border-[var(--peach-color)] px-6 py-1 rounded-md flex items-center gap-2 hover:bg-[var(--peach-color)] transition-colors duration-200 ease-in hover:text-white"
                aria-label="Add to Wishlist"
              >
                <CiHeart size={20} /> Add to Wishlist
              </button>
              <button
                className="border border-[var(--peach-color)] px-6 py-1 rounded-md flex items-center gap-2 hover:bg-[var(--peach-color)] transition-colors duration-200 ease-in hover:text-white"
                aria-label="Share"
              >
                <IoShareOutline size={20} />
                Share
              </button>
            </div>

            {/* Enroll Button */}
            <button
              className="bg-green-700 text-white w-full rounded-full py-3 font-bold hover:bg-green-800 transition-colors"
              aria-label="Enroll Now"
              onClick={handleEnrollClick}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mt-10 bg-[var(--nav-color)] px-3 max-w-3xl z-20 py-4 rounded-md text-[var(--text-color)] border border-gray-800 drop-shadow-lg shadow shadow-gray-900">
        <h1 className="text-xl font-bold">Includes</h1>
        {includes.map((include) => (
          <div key={include.id} className="flex items-center gap-3 mt-3">
            <span className="text-[var(--peach-color)]">{include.icon}</span>
            <p className="text-sm">{include.text}</p>
          </div>
        ))}
      </div>
      <div className="w-full mt-10 bg-[var(--nav-color)] px-3 max-w-3xl z-20 py-4 rounded-md text-[var(--text-color)] border border-gray-800 drop-shadow-lg shadow shadow-gray-900">
        <h1 className="text-xl font-bold mb-4">Includes</h1>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <IoPeopleOutline className="text-[#392c7d]" />
            <span className="text-[var(--text-color)]">
              Enrolled: 32 Students
            </span>
          </li>
          <hr className="mt-4 border-gray-600" />

          <li className="flex items-center gap-2 text-sm">
            <BiTimeFive className="text-[#392c7d]" />
            <span className="text-[var(--text-color)]">Duration: 12 hours</span>
          </li>
          <hr className="mt-4 border-gray-600" />

          <li className="flex items-center gap-2">
            <BiBookAlt className="text-[#392c7d]" />
            <span className="text-[var(--text-color)]">Chapters: 10</span>
          </li>
          <hr className="mt-4 border-gray-600" />

          <li className="flex items-center gap-2">
            <BiBarChart className="text-[#392c7d]" />
            <span className="text-[var(--text-color)]">Level: Beginner</span>
          </li>
          <hr className="mt-4 border-gray-600" />

          <li className="flex items-center gap-2">
            <FaVideo className="text-[#392c7d]" />
            <span className="text-[var(--text-color)]">Video Lectures: 20</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default React.memo(CourseInfo);
