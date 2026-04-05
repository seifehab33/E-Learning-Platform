import { useMutation } from "react-query";
import { Course } from "../../features/Cart/CartSlice";
import { savePurchasedItemsForUser } from "../../lib/demoUserStore";

// Define the mutation logic
const confirmPaymentRequest = async (userId: string, cartItems: Course[]) => {
  return savePurchasedItemsForUser(userId, cartItems);
};

// Create a custom hook
const useConfirmPayment = () => {
  return useMutation(
    ({ userId, cartItems }: { userId: string; cartItems: Course[] }) =>
      confirmPaymentRequest(userId, cartItems)
  );
};

export default useConfirmPayment;
