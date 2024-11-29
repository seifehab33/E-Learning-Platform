import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import logo from "../../assets/logo.svg";
import { useSignUp } from "./useSignUp";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { signUpHandler, isLoading, isError, error } = useSignUp();

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  // Validation schema with Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Formik handler
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission (call signUpHandler)
      signUpHandler(values);
    },
  });

  return (
    <section className="min-h-screen h-full flex flex-col justify-center text-[var(--text-color)] bg-[var(--nav-color)]">
      <div className="px-10 md:px-16 xl:px-32 lg:px-20 py-16">
        <div className="flex items-center justify-between">
          <img src={logo} className="cursor-pointer w-40" alt="Logo" />
          <Link to="/" className="underline text-sm text-[var(--text-color)]">
            Back to Home
          </Link>
        </div>

        <div className="form-sign mt-20">
          <h1 className="text-4xl font-semibold mb-4">Create Your Account</h1>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* Full Name Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="text-sm font-bold">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter Your Full Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                style={{ backgroundColor: "var(--main-color)" }}
                className="p-2 rounded-md outline-none placeholder:text-sm"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.fullName}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
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

            {/* Password Field */}
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
                placeholder="Enter Your Password"
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

            {/* Remember Me Checkbox */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#ff875a] text-white py-4 text-xl font-bold rounded-md mt-4"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            {isError && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
          </form>
        </div>
      </div>
      <div className="bg-[#5c505b] h-full justify-center flex items-center my-auto py-4">
        <p className="font-bold">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--peach-color)]">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUpPage;
