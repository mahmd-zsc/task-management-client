import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../../store"; // Assuming you have defined AppDispatch type in your store
import request from "../../../../../utils/request";
import { taskActions } from "./taskSlice";
import { RootState } from "@reduxjs/toolkit/query";

// Action to create a new task
export const createTask =
  (formData: FormData) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(taskActions.setIsTaskCreated(false)); // Set isTaskCreated to false before making the request
      const response = await request.post("/tasks/", formData, {
        headers: {
          token: getState().auth.userData.token,
        },
      });
      const data = response.data;

      // Dispatch success action and show success toast
      dispatch(taskActions.setIsTaskCreated(true)); // Set isTaskCreated to true after successfully creating the task
    } catch (error) {
      handleRequestError(error); // Handle request error
    }
  };

// Action to get all tasks for the current user
export const getTasks =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await request.get(
        `/tasks/user/${getState().auth.userData.id}`,
        {
          headers: {
            token: getState().auth.userData.token,
          },
        }
      );
      const data = response.data;

      // Dispatch success action and update tasks state
      dispatch(taskActions.setTasks(data));
    } catch (error) {
      handleRequestError(error); // Handle request error
    }
  };

// Action to update an existing task
export const updateTask =
  (taskId: string, formData: FormData) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await request.put(`/tasks/${taskId}`, formData, {
        headers: {
          token: getState().auth.userData.token,
        },
      });
      const data = response.data;

      // Dispatch success action and show success toast
    } catch (error) {
      handleRequestError(error); // Handle request error
    }
  };

// Action to get a specific task by its ID
export const getTaskById =
  (taskId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await request.get(`/tasks/${taskId}`, {
        headers: {
          token: getState().auth.userData.token,
        },
      });
      const data = response.data;

      // Dispatch action to store the fetched task and its ID for editing
      dispatch(taskActions.setTask(data));
      dispatch(taskActions.setEditTaskId(taskId));
    } catch (error) {
      handleRequestError(error); // Handle request error
    }
  };

// Action to delete a task
export const deleteTask =
  (taskId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await request.delete(`/tasks/${taskId}`, {
        headers: {
          token: getState().auth.userData.token,
        },
      });

      // Dispatch action to remove the deleted task from state
      dispatch(taskActions.setEditTaskId(null));
    } catch (error) {
      handleRequestError(error); // Handle request error
    }
  };

// Helper function to handle request errors
const handleRequestError = (error: any) => {
  console.log(error);
  if (error.response) {
    toast.error(error.response.data.message); // Display error message from server response
  } else {
    toast.error("An error occurred."); // Display generic error message for other errors
  }
};
