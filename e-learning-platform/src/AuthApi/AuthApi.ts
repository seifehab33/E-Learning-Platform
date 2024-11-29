import axios from "axios";

interface Credentials {
  email: string;
  password: string;
}
interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}
const BASE_URL = "http://localhost:4000";

// Function to check login credentials
export const signIn = async (credentials: Credentials): Promise<AuthUser> => {
  try {
    const usersResponse = await axios.get(
      `${BASE_URL}/Users?email=${credentials.email}`
    );

    // Log the response to ensure data is returned correctly
    console.log("Users response:", usersResponse);

    if (usersResponse.data.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = usersResponse.data[0];

    // Validate password
    if (user.password !== credentials.password) {
      throw new Error("Invalid email or password");
    }

    return { id: user.id, fullName: user.fullName, email: user.email };
  } catch (error) {
    console.error("Error in signIn:", error); // Log the error for debugging

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response?.data?.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        throw new Error("Network error. Please check your connection.");
      }
    }
    throw new Error("Invalid email or password");
  }
};
