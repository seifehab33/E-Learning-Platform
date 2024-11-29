// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  fullName?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Helper function to safely parse JSON from localStorage
export const getUserFromLocalStorage = (): User | null => {
  const userData = localStorage.getItem("user");
  try {
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

// Initial state with localStorage check
const initialState: AuthState = {
  user: getUserFromLocalStorage(),
  isAuthenticated: !!getUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user and update localStorage
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    // Handle user sign-out
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

// Export actions for use in components
export const { setUser, signOut } = authSlice.actions;

// Export reducer to be added to the store
export default authSlice.reducer;
