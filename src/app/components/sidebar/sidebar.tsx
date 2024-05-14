"use client"
import { logoutUser } from "@/lib/store/features/auth/authApiCall";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaInbox, FaRegCalendarCheck } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

// Define interface for user data
interface UserData {
  name: string;
}

function Sidebar(): JSX.Element {
  // Retrieve user data from Redux store
  const { userData } = useSelector(
    (state: { auth: { userData: UserData } }) => state.auth
  );
  // Initialize useDispatch hook
  const dispatch = useDispatch();
  // State to manage sidebar open/close state
  const [open, setOpen] = useState<boolean>(true);
  // Initialize useRouter hook
  const router = useRouter();
  // Retrieve current pathname using usePathname hook
  const pathName = usePathname();

  // Function to handle user sign out
  const handleSignOut = () => {
    // Dispatch logoutUser action
    dispatch(logoutUser());
    // Redirect to login page after logout
    redirect("/login");
  };

  return (
    // Render sidebar only if user data is available
    userData && (
      <div
        className={`relative sticky top-0 h-screen py-10 bg-gray-100 duration-200 ${
          open ? "md:w-1/4" : "w-0"
        }`}
      >
        {open && (
          <div className="relative h-full flex flex-col">
            {userData && (
              // Display user's name in sidebar
              <h2 className="hidden md:block capitalize">{userData.name}</h2>
            )}
            <div>
              <ul className="flex flex-col capitalize mt-20">
                {/* Navigation links */}
                <li
                  onClick={() => router.push("/")}
                  className={`cursor-pointer flex items-center gap-8 px-6 py-4 text-xl ${
                    pathName === "/"
                      ? "bg-blue-100 opacity-100 text-gray-800"
                      : "opacity-80 text-gray-600"
                  }`}
                >
                  <FaInbox color="" />
                  <p className="hidden md:block">inbox</p>
                </li>
                <li
                  onClick={() => router.push("/complete")}
                  className={`cursor-pointer flex items-center gap-8 px-6 py-4 text-xl ${
                    pathName === "/complete"
                      ? "bg-blue-100 opacity-100 text-gray-800"
                      : "opacity-80 text-gray-600"
                  }`}
                >
                  <FaRegCalendarCheck />
                  <p className="hidden md:block">complete</p>
                </li>
              </ul>
            </div>
            {/* User sign out or login/register buttons */}
            <div className="absolute md:left-6 bottom-0 left-1/2 -translate-x-1/2 md:-translate-x-0">
              {userData ? (
                // Render sign out button if user is logged in
                <CiLogout
                  className="text-3xl cursor-pointer"
                  onClick={handleSignOut}
                />
              ) : (
                // Render login/register buttons if user is not logged in
                <div className="flex items-center gap-2 flex-col sm:flex-row">
                  <button onClick={() => router.push("/login")}>login</button>
                  <button onClick={() => router.push("/register")}>
                    register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Button to toggle sidebar open/close state */}
        <div className="absolute top-1/2 -right-6">
          <GrNext
            onClick={() => setOpen(!open)}
            className={`${open ? "rotate-180" : ""} text-lg cursor-pointer`}
          />
        </div>
      </div>
    )
  );
}

export default Sidebar;
