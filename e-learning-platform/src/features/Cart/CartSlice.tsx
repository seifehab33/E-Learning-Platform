import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/store";

// Define the structure of the course object
export interface Course {
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
  classification?: string;
  requirements?: string[];
  description?: string;
  whatlearn?: string[];
  conclusion?: string;
  quantity: number;
}

// Helper function to load isConfirmed from localStorage
const loadIsConfirmedFromLocalStorage = (): boolean => {
  const storedIsConfirmed = localStorage.getItem("isConfirmed");
  return storedIsConfirmed === "true"; // Convert string to boolean
};

// Helper function to save isConfirmed to localStorage
const saveIsConfirmedToLocalStorage = (isConfirmed: boolean) => {
  localStorage.setItem("isConfirmed", JSON.stringify(isConfirmed));
};

// Helper function to load cart items from localStorage
const loadCartFromLocalStorage = (): Course[] => {
  const storedCart = localStorage.getItem("cartItems");
  try {
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    return cartItems.map((item: Partial<Course>) => ({
      id: item.id || "",
      course: item.course || "",
      img_course: item.img_course || "",
      quantity: item.quantity || 1, // Default quantity
      job: item.job || "",
      price: item.price || "0.00",
      discount: item.discount || "0%",
      img_inst: item.img_inst || "",
      name_inst: item.name_inst || "",
      lesson: item.lesson || "",
      hours: item.hours || "",
      rate: item.rate || "",
    }));
  } catch {
    return [];
  }
};

// Helper function to save cart items to localStorage
const saveCartToLocalStorage = (items: Course[]) => {
  const itemsToSave = items.map((item) => ({
    id: item.id,
    course: item.course,
    img_course: item.img_course,
    quantity: item.quantity,
    price: item.price,
    discount: item.discount,
  }));
  localStorage.setItem("cartItems", JSON.stringify(itemsToSave));
};

// Helper function to calculate price
const calculatePrice = (
  price: string,
  quantity: number,
  discount: string
): string => {
  const priceNum = parseFloat(price.replace("$", "").replace(",", "")) || 0;
  const discountNum = parseFloat(discount.replace("%", "")) || 0;
  const discountedPrice = priceNum - priceNum * (discountNum / 100);
  return (discountedPrice * quantity).toFixed(2); // Return price formatted to 2 decimal places
};

// Define the initial state of the cart
interface CartState {
  items: Course[];
  isConfirmed: boolean;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
  isConfirmed: loadIsConfirmedFromLocalStorage(),
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Course>) {
      const existingCourse = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingCourse) {
        existingCourse.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.items); // Persist cart
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const existingCourse = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingCourse) {
        if (existingCourse.quantity > 1) {
          existingCourse.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }
      saveCartToLocalStorage(state.items); // Persist cart
    },
    confirmPaymentStart(state) {
      state.status = "loading";
      state.error = null;
    },
    confirmPayment(state) {
      state.isConfirmed = true;
      saveIsConfirmedToLocalStorage(state.isConfirmed); // Persist confirmation
      state.status = "success";
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
    confirmPaymentFailure(state, action: PayloadAction<string>) {
      state.status = "error";
      state.error = action.payload;
    },
    setCartItems(state, action: PayloadAction<CartState["items"]>) {
      state.items = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

// Selectors
export const selectTotalCourses = (state: RootState) => state.cart.items.length;

export const selectTotalItemsInCart = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state: RootState) =>
  state.cart.items
    .reduce(
      (total, item) =>
        total +
        parseFloat(calculatePrice(item.price, item.quantity, item.discount)),
      0
    )
    .toFixed(2);

export const {
  addToCart,
  removeFromCart,
  confirmPayment,
  setCartItems,
  confirmPaymentFailure,
  confirmPaymentStart,
} = cartSlice.actions;
export default cartSlice.reducer;
