"use client"
// Importing necessary dependencies and components from React and other libraries
import React, { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import RegisterForm from "@/app/components/registerForm/registerForm";
import { useSelector } from "react-redux";

// Defining the RegisterPage component
const RegisterPage: React.FC = () => {
  // Retrieving user data from Redux store
  const { userData } = useSelector((state) => state.auth);

  // Using layout effect hook to perform side-effects after the component has rendered
  useLayoutEffect(() => {
    // Redirecting to homepage if user data is available
    if (userData) {
      redirect("/");
    }
  }, []); // Dependency array to ensure the effect runs only once after initial render

  // Returning JSX representing the RegisterPage component
  return (
    <div className="h-screen overflow-hidden">
      <RegisterForm />
    </div>
  );
};

// Exporting the RegisterPage component as default
export default RegisterPage;
