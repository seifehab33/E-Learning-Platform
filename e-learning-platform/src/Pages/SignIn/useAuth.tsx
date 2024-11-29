import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { signIn } from "../../AuthApi/AuthApi";
import { setUser } from "../../features/Auth/authSlice";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../Store/store";

interface User {
  id: string;
  email: string;
  fullName: string;
}

type SignInResponse = User;

interface ErrorResponse {
  message: string;
}

interface SignInData {
  email: string;
  password: string;
}

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    mutate: signInHandler,
    isLoading,
    isError,
    error,
  } = useMutation<SignInResponse, AxiosError<ErrorResponse>, SignInData>(
    (credentials) => signIn(credentials),
    {
      onSuccess: (data) => {
        console.log("User data received:", data);

        // Dispatch the user data to Redux store
        if (data) {
          dispatch(setUser(data));
          navigate("/"); // Redirect to the homepage or dashboard
        } else {
          console.error("No user data found in response:", data);
        }
      },
      onError: (err) => {
        console.error("Error during sign-in:", err.message);
      },
    }
  );

  // Extract error message for display
  const errorMessage = isError
    ? error?.response?.data?.message || "Login failed. Please try again."
    : "";

  return { signInHandler, isLoading, isError, error: errorMessage };
};
