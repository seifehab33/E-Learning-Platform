import { registerDemoUser } from "../lib/demoUserStore";

interface Credentials {
  email: string;
  password: string;
  fullName: string; // Added fullName for sign-up
}

// Function to sign up a new user
export const signUp = async (credentials: Credentials) => {
  try {
    return registerDemoUser(credentials);
  } catch (error) {
    console.error("Error in signUp:", error); // Log the error for debugging

    // General error if no specific error is found
    throw new Error(
      error instanceof Error ? error.message : "Sign-up failed. Please try again."
    );
  }
};
