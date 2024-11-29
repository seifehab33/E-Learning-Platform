import { useMutation } from "react-query";
import axios from "axios";
import { Course } from "../../features/Cart/CartSlice";

// Define the mutation logic
const confirmPaymentRequest = async (userId: string, cartItems: Course[]) => {
  const response = await axios.get(`http://localhost:4000/Users/${userId}`);
  const updatedUser = {
    ...response.data,
    purchasedItems: [
      // Combine existing purchased items with new items from cartItems,
      // ensuring there are no duplicates based on the `id` of each course.
      ...(response.data.purchasedItems ? response.data.purchasedItems : []),

      // Add only new courses from cartItems that are not already in purchasedItems
      ...cartItems.filter(
        (cartItem: Course) =>
          !response.data.purchasedItems?.some(
            (existingCourse: Course) => existingCourse.id === cartItem.id
          )
      ),
    ],
  };

  // Update user data with cart items
  return axios.put(`http://localhost:4000/Users/${userId}`, updatedUser);
};

// Create a custom hook
const useConfirmPayment = () => {
  return useMutation(
    ({ userId, cartItems }: { userId: string; cartItems: Course[] }) =>
      confirmPaymentRequest(userId, cartItems)
  );
};

export default useConfirmPayment;
