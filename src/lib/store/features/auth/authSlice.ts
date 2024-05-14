import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for the authentication state
interface AuthState {
  userData: object | null; // User data object or null if not logged in
  loading: boolean; // Loading state
  success: boolean; // Success state
  error: string | null; // Error message or null if no error
}

// Define the initial state for authentication
const initialState: AuthState = {
  userData: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null, // Retrieve user info from local storage or set to null
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer to handle login action
    login(state, action: PayloadAction<{ username: string }>) {
      state.userData = action.payload; // Set user data from the action payload
      state.success = true; // Set success to true after successful login
    },
    // Reducer to handle logout action
    logout(state) {
      state.userData = null; // Set user data to null after logout
      state.loading = false; // Set loading to false after logout
      state.success = false; // Set success to false after logout
    },
    // Reducer to set success state
    setSuccess(state, action: PayloadAction<boolean>) {
      state.success = action.payload; // Set success state from the action payload
    },
  },
});

// Export the authentication reducer
export const authReducer = authSlice.reducer;
// Export authentication actions
export const authActions = authSlice.actions;
