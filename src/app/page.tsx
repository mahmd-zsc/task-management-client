// Importing necessary dependencies and components from React and other libraries
"use client"
import React from "react";
import { MdMenu } from "react-icons/md";
import AddTaskForm from "./components/task/addTaskForm";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "@/lib/store/hooks";
import Tasks from "./components/task/tasks";
import { useLayoutEffect } from "react";
import { Router } from "next/router";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { useSelector } from "react-redux";

// Defining the functional component Page
function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Retrieving user data from Redux store
  let { userData } = useSelector((state) => state.auth);

  // Using layout effect hook to perform side-effects after the component has rendered
  useLayoutEffect(() => {
    // Checking if user data is not available, then redirecting to login page
    if (!userData) {
      redirect(`/login`);
    }
  }, [userData]); // Dependency array to ensure the effect runs only when userData changes

  // Returning JSX representing the Page component
  return (
    <div className="relative">
      {/* Header section */}
      <div className="flex items-center gap-4 text-2xl">
        <MdMenu /> {/* Menu icon */}
        <h1 className="font-semibold">Inbox</h1> {/* Title */}
      </div>

      {/* Main content section */}
      <div>
        {/* Adding task form component */}
        <>
          <AddTaskForm />
          {/* Displaying tasks */}
          <Tasks />
        </>
      </div>

      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </div>
  );
}

// Exporting the Page component as default
export default Page;
