"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CiCircleRemove } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import {
  deleteTask,
  getTasks,
  updateTask,
} from "@/lib/store/features/task/taskApiCall";
import { taskActions } from "@/lib/store/features/task/taskSlice";

function EditTask(): JSX.Element {
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state.task);

  // State to manage form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
  });

  // Categories list
  const categories = [
    "personal",
    "shopping",
    "work",
    "study",
    "health",
    "fitness",
    "family",
    "finance",
  ];

  // Effect to set form data when task changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task?.title || "",
        description: task?.description || "",
        dueDate: task?.dueDate?.split("T")[0] || "",
        category: task?.category || "",
      });
    }
  }, [task]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if title field is empty
    if (formData.title.trim() === "") {
      toast.error("Please fill in the title field.");
      return;
    }

    // Remove empty fields and dispatch updateTask action
    const dataToSend = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value.trim() !== "")
    );
    await dispatch(updateTask(task._id, dataToSend));

    // Dispatch action to set task as completed and clear edit task ID
    dispatch(taskActions.setMakeCompleted());
    dispatch(taskActions.setEditTaskId(null));
  };

  // Function to handle input change
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle completion of task
  const handleComplete = () => {
    dispatch(updateTask(task._id, { isComplete: true }));
    dispatch(taskActions.setMakeCompleted());
    dispatch(taskActions.setEditTaskId(null));
  };

  // Function to handle removal of task
  const handleRemove = async () => {
    await dispatch(deleteTask(task._id));
    dispatch(getTasks());
  };

  return (
    <div className="pt-10 px-4 overflow-hidden h-full">
      <div className="shadow-sm h-full">
        <form className="h-full flex flex-col" onSubmit={handleSubmit}>
          {/* Task title input */}
          <div className="flex items-center gap-4 bg-gray-100 px-2 py-4">
            <div
              onClick={handleComplete}
              className="w-5 h-5 rounded-full border-2 border-mainRed opacity-40 dark:opacity-100 hover:bg-gray-700 duration-200 cursor-pointer p-2"
            ></div>
            <input
              className="bg-transparent outline-none"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          {/* Task description input */}
          <div className="flex items-center gap-4 mt-4">
            <textarea
              placeholder="Enter description"
              className="outline-none max-h-40 min-h-40 bg-gray-100 px-2 overflow-y-scroll w-full"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          {/* Due date input */}
          <input
            className="bg-transparent outline-none w-full mt-4 px-2 py-2 bg-gray-100"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
          />

          {/* Category select */}
          <select
            className="outline-none border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-mainRed focus:border-transparent"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Buttons for submitting, completing, and removing tasks */}
          <div className="flex-1 flex justify-between text-2xl items-end pb-10">
            <TbLogout2 type="submit" className="cursor-pointer" />
            <CiCircleRemove
              onClick={handleRemove}
              className="cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
