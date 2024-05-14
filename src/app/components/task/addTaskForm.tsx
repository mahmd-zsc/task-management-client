"use client"
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { createTask } from "@/lib/store/features/task/taskApiCall";
import { RootState } from "@reduxjs/toolkit/query";
import { MdDateRange } from "react-icons/md";

interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  category: string;
}

function AddTaskForm(): JSX.Element {
  const categories: string[] = [
    "personal",
    "shopping",
    "work",
    "study",
    "health",
    "fitness",
    "family",
    "finance",
  ];

  const dispatch = useDispatch();
  const today: string = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    dueDate: "",
    category: "",
  });

  // Retrieve authentication state from Redux store
  const auth = useSelector((state: RootState) => state.auth);

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if title field is empty
    if (formData.title.trim() === "") {
      toast.error("Please fill in the title field.");
      return;
    }

    // Dispatch createTask action
    const dataToSend = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value.trim() !== "")
    );
    await dispatch(createTask(dataToSend));

    // Reset form data after submission
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      category: "",
    });
  };

  // Function to handle input change
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="mt-10 bg-gray-100 shadow-lg">
      <form onSubmit={handleSubmit}>
        {/* Task title input */}
        <div className="flex items-center gap-2 flex-1 px-6">
          <div className="w-5 h-5 rounded-full border-2 border-mainRed opacity-40 dark:opacity-100"></div>
          <input
            name="title"
            placeholder="Add your task"
            value={formData.title}
            onChange={handleInputChange}
            className="dark:bg-secondDark w-full outline-none px-2 py-4 placeholder:capitalize focus:placeholder:text-gray-300 bg-transparent flex-1"
            type="text"
          />
        </div>

        {/* Task description input */}
        <div className="px-12">
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className={`${
              formData.title ? "h-auto opacity-100 py-1 px-2 " : "h-0 opacity-0 hidden"
            } dark:bg-secondDark w-full outline-none  placeholder:capitalize focus:placeholder:text-gray-300 bg-transparent duration-300`}
            type="text"
          />
        </div>

        {/* Due date and category inputs */}
        <div className="relative flex justify-between items-center bg-gray-200 py-2 px-6">
          <MdDateRange className="absolute left-6 opacity-60 cursor-pointer" />
          <input
            name="dueDate"
            min={today}
            value={formData.dueDate}
            onChange={handleInputChange}
            className="w-4 h-4 opacity-0 cursor-pointer"
            type="date"
          />
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="block appearance-none w-full bg-transparent border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit button */}
        <div className=" flex justify-end  px-6 py-2 bg-white">
          <input
            className="cursor-pointer text-blue-500 capitalize"
            type="submit"
            value="Add"
          />
        </div>
      </form>
      {/* React Toastify container */}
      <ToastContainer />
    </div>
  );
}

export default AddTaskForm;
