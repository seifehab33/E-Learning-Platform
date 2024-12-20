import { CiHeart } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";
import {
  ErrorWrapper,
  LoadingWrapper,
} from "../FeaturedCourses/FeaturedCourses";
import useCourseDetails from "./useCourseDetails";
import { useMemo, useState, useEffect } from "react";
import { IoMdClose, IoMdDownload } from "react-icons/io";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaCloudDownloadAlt, FaKey } from "react-icons/fa";
import { MdDevices } from "react-icons/md";
import { SlGraduation } from "react-icons/sl";
import { IoPeopleOutline } from "react-icons/io5";
import { BiTimeFive, BiBookAlt, BiBarChart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { selectPurchasedItems } from "../../../features/Cart/PurchasedSlice";
import { AppDispatch } from "../../../Store/store";
import { addToCart } from "../../../features/Cart/CartSlice";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

const includes = [
  { id: 1, icon: <IoMdDownload />, text: "11 hours on-demand video" },
  { id: 2, icon: <AiOutlinePlayCircle />, text: "69 downloadable resources" },
  { id: 3, icon: <FaKey />, text: "Full lifetime access" },
  { id: 4, icon: <MdDevices />, text: "Access on mobile and TV" },
  { id: 5, icon: <FaCloudDownloadAlt />, text: "Assignments" },
  { id: 6, icon: <SlGraduation />, text: "Certificate of Completion" },
];

const calculateDiscountPercentage = (
  price: string,
  discount: string
): string => {
  const priceNum = parseFloat(price.replace("$", ""));
  const discountNum = parseFloat(discount.replace("$", ""));
  if (
    isNaN(priceNum) ||
    isNaN(discountNum) ||
    priceNum <= 0 ||
    discountNum <= 0 ||
    discountNum >= priceNum
  ) {
    return "0%";
  }

  const percentage = ((priceNum - discountNum) / priceNum) * 100;
  return `${Math.round(percentage)}%`;
};

function CourseInfo() {
  const { Details, isLoading, isError } = useCourseDetails();
  const [isModalOpen, setModalOpen] = useState(false);
  const purchasedItems = useSelector(selectPurchasedItems);
  const dispatch = useDispatch<AppDispatch>();
  const [Ready, setIsReady] = useState(true);
  const navigate = useNavigate();
  const getUserEmailFromLocalStorage = (): string | null => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return user.email || null; // Return the email or null if not found
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        return null; // Default to null on error
      }
    }
    return null; // Default to null if no user is stored
  };
  const userEmail = getUserEmailFromLocalStorage();
  const isDemoUser = userEmail === "demo@email.com";

  const handlePlayerReady = () => {
    setIsReady(false);
  };

  const handleStart = () => {
    setIsReady(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const courseId = Details?.id;
  const isPurchased = purchasedItems.some((item) => item.id === courseId);

  const discountPercentage = useMemo(() => {
    if (!Details?.price || !Details?.discount) return "0%";
    return calculateDiscountPercentage(Details.price, Details.discount);
  }, [Details?.price, Details?.discount]);

  const handleEnrollClick = () => {
    if (!Details) return;

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
    navigate("/cart/:id");
  };

  // Effect to update localStorage only when the cart changes
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
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

    localStorage.setItem(
      "cartItems",
      JSON.stringify([...cartItems, newCartItem])
    );
  }, [Details]);
  const handleCourseAction = () => {
    if (isDemoUser) {
      alert("You cannot enroll or play this course as a demo user.");
    } else if (isPurchased) {
      handleOpenModal();
    } else {
      handleEnrollClick();
    }
  };

  if (isLoading) return <LoadingWrapper />;
  if (isError) return <ErrorWrapper />;

  return (
    <>
      <div className="video-course w-full flex justify-center mt-0 lg:-mt-72">
        <div className="w-full bg-[var(--nav-color)] px-3 max-w-3xl z-20 py-4 rounded-md text-[var(--text-color)] border border-gray-800 drop-shadow-lg shadow shadow-gray-900">
          <div className="">
            <div className="mb-4">
              {!isDemoUser && Ready && <LoadingWrapper />}
              {!isDemoUser && (
                <ReactPlayer
                  url={Details?.course_link}
                  alt="Course Video Thumbnail"
                  height={200}
                  width="100%"
                  controls
                  onReady={handlePlayerReady}
                  onStart={handleStart}
                />
              )}
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
              <button className="border border-[var(--peach-color)] cursor-pointer px-6 py-1 rounded-md flex items-center gap-2 hover:bg-[var(--peach-color)] transition-colors duration-200 ease-in hover:text-white">
                <IoShareOutline size={20} />
                Share
              </button>
            </div>

            <button
              className={`${
                isPurchased ? "bg-blue-700" : "bg-green-700"
              } text-white w-full rounded-full py-3 font-bold hover:${
                isPurchased ? "bg-blue-800" : "bg-green-800"
              } transition-colors cursor-pointer`}
              aria-label={isPurchased ? "Watch Course" : "Enroll Now"}
              onClick={handleCourseAction}
            >
              {isPurchased ? "Watch Course" : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center px-5">
          <div className="relative bg-black w-full max-w-4xl p-4 rounded-md shadow-lg">
            <button
              className="absolute top-3 right-3 text-white text-2xl"
              onClick={handleCloseModal}
              aria-label="Close Modal"
            >
              <IoMdClose />
            </button>
            <ReactPlayer
              url={Details?.course_link}
              playing
              controls
              width="100%"
              height="400px"
            />
          </div>
        </div>
      )}
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
            <span className="text-[var(--text-color)]">
              Level: Intermediate
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default CourseInfo;
