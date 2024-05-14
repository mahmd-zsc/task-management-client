import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../../store"; // Import the AppDispatch type from the store
import request from "../../../../../utils/request"; // Import the request utility function
import { authActions } from "./authSlice"; // Import actions from authSlice

// Async action to log in a user
export const loginUser =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      // Send a POST request to the login endpoint with the form data
      const response = await request.post("/auth/login", formData);
      const data = response.data; // Extract the response data

      // Dispatch the login action with the received data
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data)); // Store user info in local storage

      // Display success toast upon successful login
      toast.success("Login successful ✔");
    } catch (error) {
      // Handle errors
      if (error.response) {
        toast.error(error.response.data.message); // Display error message from server response
      } else {
        toast.error("An error occurred during login:"); // Display generic error message
      }
    }
  };

// Async action to register a user
export const registerUser =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      // Send a POST request to the register endpoint with the form data
      const response = await request.post("/auth/register", formData);
      const data = response.data; // Extract the response data

      // Display success toast upon successful registration
      toast.success("Registration successful");

      localStorage.setItem("userInfo", JSON.stringify(data)); // Store user info in local storage
    } catch (error) {
      // Handle errors
      if (error.response) {
        toast.error(error.response.data.message); // Display error message from server response
      } else {
        toast.error("An error occurred during registration:"); // Display generic error message
      }
    }
  };

// Action to log out a user
export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authActions.logout()); // Dispatch the logout action
      toast.success("Logout successful ✔"); // Display success toast upon successful logout
      localStorage.removeItem("userInfo"); // Remove user info from local storage
    } catch (error) {
      toast.error("Error occurred during logout: " + error); // Display error message if logout fails
    }
  };
};
