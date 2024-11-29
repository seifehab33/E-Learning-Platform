// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import cartReducer from "../features/Cart/CartSlice";
import purchasedReducer from "../features/Cart/PurchasedSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    purchased: purchasedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
