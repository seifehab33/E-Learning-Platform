import { loginDemoUser } from "../lib/demoUserStore";

interface Credentials {
  email: string;
  password: string;
}
interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}
// Function to check login credentials
export const signIn = async (credentials: Credentials): Promise<AuthUser> => {
  try {
    return loginDemoUser(credentials);
  } catch (error) {
    console.error("Error in signIn:", error); // Log the error for debugging
    throw new Error(
      error instanceof Error ? error.message : "Invalid email or password"
    );
  }
};
