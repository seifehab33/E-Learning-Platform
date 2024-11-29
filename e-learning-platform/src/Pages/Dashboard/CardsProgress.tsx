import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { usePurchasedCourses } from "./usePurchasedCourses ";

function CardsProgress() {
  const [enrolledCourses, setEnrolledCourses] = useState<number>(0);
  const isConfirmed = useSelector((state: RootState) => state.cart.isConfirmed);
  const getUserIdFromLocalStorage = (): string => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return user.id || ""; // Return the ID or an empty string if not found
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        return ""; // Default to an empty string on error
      }
    }
    return "";
  };
  const userId = getUserIdFromLocalStorage();
  const { data: purchasedCourses } = usePurchasedCourses(userId, isConfirmed);
  if (purchasedCourses && purchasedCourses.length !== enrolledCourses) {
    setEnrolledCourses(purchasedCourses.length);
  }
  return (
    <div className="flex gap-5 text-[var(--text-color)]">
      <div className="pt-3 pb-11 px-3 bg-[var(--nav-color)] w-72 border border-solid border-gray-700">
        <p className="text-[18px]">Enrolled Courses</p>
        <p className="text-2xl">{enrolledCourses}</p>
      </div>
      <div className="pt-3 pb-11 px-3 bg-[var(--nav-color)] w-72 border border-solid border-gray-700">
        <p className="text-[18px]">Active Courses</p>
        <p className="text-2xl">0</p>
      </div>
      <div className="pt-3 pb-11 px-3 bg-[var(--nav-color)] w-72 border border-solid border-gray-700">
        <p className="text-[18px]">Completed Courses</p>
        <p className="text-2xl">0</p>
      </div>
    </div>
  );
}

export default CardsProgress;
