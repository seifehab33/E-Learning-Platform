import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../UserApi/UserApi";
import { setUser } from "../../features/Auth/authSlice";
import { AppDispatch } from "../../Store/store";

interface User {
  id: string;
  email: string;
  fullName: string;
  password: string;
  // You can add other user properties as required
}

type SignUpResponse = User;

interface ErrorResponse {
  message: string;
}

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    mutate: signUpHandler,
    isLoading,
    isError,
    error,
  } = useMutation<SignUpResponse, AxiosError<ErrorResponse>, SignUpData>(
    (userData) => signUp(userData),
    {
      onSuccess: (data) => {
        const { password, ...userDataWithoutPassword } = data; // eslint-disable-line @typescript-eslint/no-unused-vars

        console.log("User data received:", userDataWithoutPassword);

        dispatch(setUser(userDataWithoutPassword));

        navigate("/");
      },
      onError: (err) => {
        console.error("Error during sign-up:", err);
      },
    }
  );

  // Extract error message for display
  const errorMessage = isError
    ? error?.response?.data?.message || "Sign-up failed. Please try again."
    : "";

  return { signUpHandler, isLoading, isError, error: errorMessage };
};
