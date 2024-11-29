import axios from "axios";

interface Credentials {
  email: string;
  password: string;
  fullName: string; // Added fullName for sign-up
}

const BASE_URL = "http://localhost:4000";

// Function to sign up a new user
export const signUp = async (credentials: Credentials) => {
  try {
    // Send a POST request to create a new user
    const response = await axios.post(`${BASE_URL}/Users`, credentials);

    // Log the response to ensure the user is created correctly
    console.log("User created:", response);

    // Return the user data after successful sign-up
    return response.data;
  } catch (error) {
    console.error("Error in signUp:", error); // Log the error for debugging

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response?.data?.message || "Sign-up failed. Please try again."
        );
      } else if (error.request) {
        throw new Error("Network error. Please check your connection.");
      }
    }

    // General error if no specific error is found
    throw new Error("Sign-up failed. Please try again.");
  }
};
