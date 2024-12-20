import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import logo from "../../assets/logo.svg";
import { useAuth } from "./useAuth";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Use the custom hook for sign-in
  const { signInHandler, isLoading, error } = useAuth();

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Formik form handler
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const demoCredentials = {
        email: "demo@email.com",
        password: "demo1234",
      };
      if (
        values.email === demoCredentials.email &&
        values.password === demoCredentials.password
      ) {
        // Automatically sign in with demo credentials
        signInHandler(demoCredentials);
      } else {
        // Proceed with the user-entered credentials
        signInHandler(values);
      }
    },
  });

  return (
    <section className="min-h-screen h-full  flex flex-col justify-center text-[var(--text-color)] bg-[var(--nav-color)]">
      <div className="px-10 md:px-16 xl:px-32 lg:px-20 py-16">
        <div className="flex items-center justify-between">
          <img src={logo} className="cursor-pointer w-40" alt="Logo" />
          <Link to="/" className="underline text-sm text-[var(--text-color)]">
            Back to Home
          </Link>
        </div>

        <div className="form-sign mt-20">
          <h1 className="text-4xl font-semibold mb-4">
            Sign into Your Account
          </h1>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="demo@email.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                style={{ backgroundColor: "var(--main-color)" }}
                className="p-2 rounded-md outline-none placeholder:text-sm"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="flex flex-col relative gap-2">
              <label htmlFor="password" className="text-sm font-bold">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="demo123"
                style={{ backgroundColor: "var(--main-color)" }}
                className="p-2 rounded-md outline-none placeholder:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10 right-3 text-gray-500"
              >
                {showPassword ? (
                  <BiSolidShow size={21} />
                ) : (
                  <BiSolidHide size={21} />
                )}
              </button>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isChecked}
                  onChange={handleToggle}
                />
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded border transition-colors ease-out duration-300 ${
                    isChecked
                      ? "border-black bg-[var(--peach-color)]"
                      : "border-gray-400"
                  }`}
                >
                  {isChecked && <FaCheck className="text-white" />}
                </div>
                <p className="ml-2">Remember me</p>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#ff875a] text-white py-4 text-xl font-bold rounded-md mt-4"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </form>
        </div>
      </div>
      <div className="bg-[#5c505b] h-full justify-center flex items-center my-auto">
        <p className="font-bold  ">
          New User ?{" "}
          <Link to="/signup" className="text-[var(--peach-color)]">
            Create New Account
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
