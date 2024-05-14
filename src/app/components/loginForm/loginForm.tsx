"use client"
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import React Toastify styles
import { loginUser } from "@/lib/store/features/auth/authApiCall";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

function LoginForm() {
  // Initialize useRouter hook
  const router = useRouter();
  // Initialize useDispatch hook
  const dispatch = useDispatch();

  // State to manage form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function to handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Trim whitespace from input fields
    const trimmedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );

    // Check if any input field is empty after trimming
    if (Object.values(trimmedFormData).some((value) => value === "")) {
      // Display toast error message if any field is empty
      toast.error("Please fill in all fields.");
      return; // Exit function
    }

    // Dispatch loginUser action to attempt login
    await dispatch(loginUser(formData));

    // Redirect to home page if login is successful
    router.replace("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      {/* Login form */}
      <div className="flex flex-col bg-white shadow-2xl shadow-gray-600  px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800 capitalize">
          Login
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                E-Mail Address:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i className="fas fa-at text-blue-500"></i>
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            {/* Password input */}
            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Password:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <i className="fas fa-lock text-blue-500"></i>
                  </span>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            {/* Submit button */}
            <div className="flex w-full">
              <button
                type="submit"
                className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase">Login</span>
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
            {/* Registration link */}
            <div className="flex justify-center items-center mt-6">
              <span className="text-gray-700 font-medium text-xs">
                I don't have an account?
              </span>
              <a
                onClick={() => router.replace("/register")}
                className="ml-2 text-blue-500 font-semibold text-xs underline cursor-pointer"
              >
                Register here
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* React Toastify container */}
      <ToastContainer />
    </div>
  );
}

export default LoginForm;
