import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  confirmPayment,
  confirmPaymentFailure,
  confirmPaymentStart,
} from "../../features/Cart/CartSlice";
import { useNavigate } from "react-router-dom";
import useConfirmPayment from "./useConfirmPayment";
import { RootState } from "../../Store/store";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
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
    return ""; // Default to an empty string if no user is stored
  };
  const userId = getUserIdFromLocalStorage();
  const mutation = useConfirmPayment();
  const formik = useFormik({
    initialValues: {
      paymentMethod: "",
      cardNumber: "",
      month: "",
      year: "",
      cvv: "",
      nameOnCard: "",
      rememberCard: false,
    },
    validationSchema: Yup.object({
      paymentMethod: Yup.string().required("Please select a payment method."),
      cardNumber: Yup.string()
        .matches(/^\d{16}$/, "Card number must be 16 digits.")
        .required("Card number is required."),
      month: Yup.string().required("Month is required."),
      year: Yup.string().required("Year is required."),
      cvv: Yup.string()
        .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits.")
        .required("CVV is required."),
      nameOnCard: Yup.string().required("Name on card is required."),
      rememberCard: Yup.boolean(),
    }),
    onSubmit: () => {
      dispatch(confirmPaymentStart());

      mutation.mutate(
        { userId, cartItems },
        {
          onSuccess: () => {
            dispatch(confirmPayment()); // Dispatch success action
            navigate("/dashboard");
          },
          onError: (error: unknown) => {
            if (error instanceof Error) {
              dispatch(
                confirmPaymentFailure(error.message || "An error occurred")
              );
            } else {
              dispatch(confirmPaymentFailure("An unknown error occurred"));
            }
          },
        }
      );
    },
  });

  return (
    <div className="max-w-4xl bg-[var(--nav-color)] p-6 rounded-lg shadow-lg mt-7 border border-solid border-gray-600">
      <h2 className="text-xl font-semibold text-white mb-6">Payment Method</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Payment Method */}
        <div className="flex items-center gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="Credit or Debit card"
              className="hidden peer"
              onChange={formik.handleChange}
              checked={formik.values.paymentMethod === "Credit or Debit card"}
            />
            <div className="peer-checked:ring-2 peer-checked:ring-red-500 w-4 h-4 border rounded-full flex items-center justify-center"></div>
            <span className="text-white">Credit or Debit card</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              className="hidden peer"
              onChange={formik.handleChange}
              checked={formik.values.paymentMethod === "PayPal"}
            />
            <div className="peer-checked:ring-2 peer-checked:ring-red-500 w-4 h-4 border rounded-full flex items-center justify-center"></div>
            <span className="text-white">PayPal</span>
          </label>
        </div>
        {formik.touched.paymentMethod && formik.errors.paymentMethod && (
          <div className="text-red-500 text-sm mb-4">
            {formik.errors.paymentMethod}
          </div>
        )}

        {/* Card Number */}
        <div className="mb-4">
          <label className="block text-white mb-1">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="XXXX XXXX XXXX XXXX"
            className="w-full p-2 border bg-[#2a2a3d] text-white rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cardNumber}
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <div className="text-red-500 text-sm">
              {formik.errors.cardNumber}
            </div>
          )}
        </div>

        {/* Month, Year, and CVV */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-white mb-1">Month</label>
            <select
              name="month"
              className="w-full p-2 border bg-[#2a2a3d] text-white rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.month}
            >
              <option value="" label="Month" />
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
            {formik.touched.month && formik.errors.month && (
              <div className="text-red-500 text-sm">{formik.errors.month}</div>
            )}
          </div>
          <div>
            <label className="block text-white mb-1">Year</label>
            <select
              name="year"
              className="w-full p-2 border bg-[#2a2a3d] text-white rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.year}
            >
              <option value="" label="Year" />
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i} value={2024 + i}>
                  {2024 + i}
                </option>
              ))}
            </select>
            {formik.touched.year && formik.errors.year && (
              <div className="text-red-500 text-sm">{formik.errors.year}</div>
            )}
          </div>
          <div>
            <label className="block text-white mb-1">CVV Code</label>
            <input
              type="text"
              name="cvv"
              placeholder="XXXX"
              className="w-full p-2 border bg-[#2a2a3d] text-white rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cvv}
            />
            {formik.touched.cvv && formik.errors.cvv && (
              <div className="text-red-500 text-sm">{formik.errors.cvv}</div>
            )}
          </div>
        </div>

        {/* Name on Card */}
        <div className="mb-4">
          <label className="block text-white mb-1">Name on Card</label>
          <input
            type="text"
            name="nameOnCard"
            placeholder="Full Name"
            className="w-full p-2 border bg-[#2a2a3d] text-white rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nameOnCard}
          />
          {formik.touched.nameOnCard && formik.errors.nameOnCard && (
            <div className="text-red-500 text-sm">
              {formik.errors.nameOnCard}
            </div>
          )}
        </div>

        {/* Remember this card */}
        <div className="flex items-center cursor-pointer gap-2 mb-6">
          {formik.values.rememberCard ? (
            <div
              className="flex items-center justify-center w-5 h-5 bg-[var(--peach-color)] border-[var(--peach-color)] border-2 rounded-md transition-all duration-300 transform scale-100 hover:scale-110"
              onClick={() => formik.setFieldValue("rememberCard", false)}
            >
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          ) : (
            <div
              className="flex items-center justify-center w-5 h-5 border-2 border-gray-400 rounded-md transition-all duration-300 transform scale-100 hover:scale-110"
              onClick={() => formik.setFieldValue("rememberCard", true)}
            />
          )}
          <label htmlFor="rememberCard" className="text-gray-200">
            Remember this card
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-[#f05454] text-white rounded font-semibold transition-all hover:bg-[#f46666]"
        >
          Make a Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
