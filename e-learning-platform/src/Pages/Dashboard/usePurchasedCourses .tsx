import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Course } from "../../features/Cart/CartSlice";
import { setPurchasedItems } from "../../features/Cart/PurchasedSlice";

// Function to fetch purchased items from the API
const fetchPurchasedCourses = async (userId: string): Promise<Course[]> => {
  const response = await axios.get(`http://localhost:4000/Users/${userId}`);
  return response.data.purchasedItems || [];
};

// Custom hook to fetch purchased courses
export const usePurchasedCourses = (userId: string, isConfirmed: boolean) => {
  const dispatch = useDispatch();

  // Use query to fetch data from the API
  const query = useQuery(
    ["purchasedCourses", userId, isConfirmed],
    () => fetchPurchasedCourses(userId),
    {
      enabled: !!userId && isConfirmed, // Only fetch if userId and isConfirmed are available
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
      onSuccess: (data) => {
        if (data.length > 0) {
          // Update Redux state with the fetched data
          dispatch(setPurchasedItems(data));
        }
      },
    }
  );

  return {
    data: query.data || [], // Use data from the query or fallback to an empty array
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};
