"use client";
// Importing necessary dependencies and components from React and other libraries
import React, { useLayoutEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import LoginForm from "@/app/components/loginForm/loginForm";
import RootLayout from "@/app/layout";
import { useAppSelector } from "@/lib/store/hooks";

// Defining the LoginPage component
const LoginPage: React.FC = () => {
  // Retrieving user data from Redux store
  let { userData } = useSelector((state) => state.auth);

  // Using layout effect hook to perform side-effects after the component has rendered
  useLayoutEffect(() => {
    // Redirecting to homepage if user data is available
    if (userData) {
      redirect("/");
    }
  }, []); // Dependency array to ensure the effect runs only once after initial render

  // Returning JSX representing the LoginPage component
  return (
    <div className="h-screen overflow-hidden">
      <LoginForm />
    </div>
  );
};

// Exporting the LoginPage component as default
export default LoginPage;
