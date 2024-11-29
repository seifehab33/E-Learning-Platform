import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import {
  CourseGrid,
  ErrorWrapper,
  LoadingWrapper,
} from "../Home/FeaturedCourses/FeaturedCourses";
import { useState, useEffect } from "react";
import { Course } from "../../features/Cart/CartSlice";
import { usePurchasedCourses } from "./usePurchasedCourses ";

function RecentlyEnrolled() {
  const isConfirmed = useSelector((state: RootState) => state.cart.isConfirmed);
  const [userId, setUserId] = useState<string>("");

  // Fetch userId once on component mount to avoid re-fetching on every render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserId(user.id || ""); // Set userId from localStorage
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []); // This runs once on mount

  // Fetch purchased courses based on userId and isConfirmed
  const {
    data: purchasedCourses,
    isLoading,
    isError,
    refetch,
  } = usePurchasedCourses(userId, isConfirmed);

  // Effect to trigger refetch when isConfirmed or userId changes
  useEffect(() => {
    if (userId && isConfirmed && refetch) {
      refetch(); // Trigger the refetch when the user ID or isConfirmed changes
    }
  }, [userId, isConfirmed, refetch]); // Dependencies for refetching

  const [favoritedIndex, setFavoritedIndex] = useState<number | null>(null);

  const toggleFavorite = (index: number) => {
    setFavoritedIndex(favoritedIndex === index ? null : index);
  };

  if (isLoading) {
    return <LoadingWrapper />;
  }

  if (isError) {
    return <ErrorWrapper />;
  }

  // If no payment confirmation
  if (!isConfirmed) {
    return (
      <p className="text-center font-bold text-3xl text-[var(--text-color)] mt-10">
        No payment confirmed yet.
      </p>
    );
  }

  // If no purchased courses available
  if (!purchasedCourses || purchasedCourses.length === 0) {
    return (
      <p className="text-center font-bold text-3xl text-[var(--text-color)] mt-10">
        No courses purchased yet.
      </p>
    );
  }

  // Render recently enrolled courses
  return (
    <div className="mt-[30px] text-[var(--text-color)]">
      <h1 className="text-2xl font-bold mb-[30px]">
        Recently Enrolled Courses
      </h1>
      <CourseGrid
        courses={purchasedCourses}
        courseIds={purchasedCourses.map((course: Course) => course.id)}
        favoritedIndex={favoritedIndex}
        onToggleFavorite={toggleFavorite}
        useSwiper={false}
        currentPage={1}
        itemsPerPage={8}
        isGrid={false}
        courseLayout={true}
      />
    </div>
  );
}

export default RecentlyEnrolled;
