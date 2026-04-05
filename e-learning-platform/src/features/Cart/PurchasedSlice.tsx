import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/store";
import { Course } from "../../features/Cart/CartSlice";

// Define the initial state (without loading from localStorage)
interface PurchasedState {
  items: Course[];
}

const loadPurchasedItemsFromLocalStorage = (): Course[] => {
  const storedPurchasedItems = localStorage.getItem("purchasedItems");

  try {
    const parsedItems = storedPurchasedItems
      ? JSON.parse(storedPurchasedItems)
      : [];
    return Array.isArray(parsedItems) ? parsedItems : [];
  } catch {
    return [];
  }
};

const initialState: PurchasedState = {
  items: loadPurchasedItemsFromLocalStorage(),
};

const purchasedSlice = createSlice({
  name: "purchased",
  initialState,
  reducers: {
    setPurchasedItems(state, action: PayloadAction<Course[]>) {
      // Combine existing items with new items, avoiding duplicates
      const newItems = action.payload.filter(
        (newItem) => !state.items.some((item) => item.id === newItem.id)
      );
      state.items = [...state.items, ...newItems];

      // Optionally, save to localStorage if you still want to persist data
      localStorage.setItem("purchasedItems", JSON.stringify(state.items));
    },
    clearPurchasedItems(state) {
      state.items = [];
      localStorage.removeItem("purchasedItems"); // Clear from localStorage
    },
  },
});

// Export actions and reducer
export const { setPurchasedItems, clearPurchasedItems } =
  purchasedSlice.actions;
export const selectPurchasedItems = (state: RootState) => state.purchased.items;
export default purchasedSlice.reducer;
