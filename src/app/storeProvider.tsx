"use client";
// Importing necessary dependencies and components from React and other libraries
import React, { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/lib/store/store";

// Defining the StoreProvider component
const StoreProvider = ({ children }: { children: ReactNode }) => {
  // Creating a reference to the store
  const storeRef = useRef<AppStore>();

  // Checking if the store reference is not initialized, then initialize it
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  // Returning the Redux Provider component with the store
  return <Provider store={storeRef.current}>{children}</Provider>;
};

// Exporting the StoreProvider component as default
export default StoreProvider;
