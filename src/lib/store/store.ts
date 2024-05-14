import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/authSlice";
import { taskReducer } from "./features/task/taskSlice";

// Define a function to create the Redux store
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer, // Include the auth reducer in the store
      task: taskReducer, // Include the task reducer in the store
    },
  });
};

// Infer the type of makeStore to define the AppStore type
export type AppStore = ReturnType<typeof makeStore>;

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
