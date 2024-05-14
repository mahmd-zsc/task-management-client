"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { PiWarningCircleBold } from "react-icons/pi";
import { getTaskById, updateTask } from "@/lib/store/features/task/taskApiCall";
import { taskActions } from "@/lib/store/features/task/taskSlice";

interface Task {
  _id: string;
  title: string;
  category: string;
}

interface Props {
  task: Task;
}

/**
 * Component to render a task box.
 * @param task The task to display.
 */
function TaskBox({ task }: Props): JSX.Element {
  const dispatch = useDispatch();

  /**
   * Handler function to mark a task as completed.
   */
  const handleComplete = () => {
    dispatch(updateTask(task._id, { isComplete: true }));
    dispatch(taskActions.setMakeCompleted());
  };

  /**
   * Handler function to edit a task.
   */
  const editTaskHandler = () => {
    dispatch(getTaskById(task._id));
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 shadow-sm px-6 py-4">
      <div className="flex items-center gap-4">
        <div
          onClick={handleComplete}
          className="w-5 h-5 rounded-full border-2 border-mainRed opacity-40 dark:opacity-100 hover:bg-gray-700 duration-200 cursor-pointer p-2"
        ></div>
        <p>{task.title}</p>
      </div>
      <div>
        <p className="px-2 ph-1 bg-gray-800 rounded-2xl text-white">
          {task?.category}
        </p>
      </div>
      <PiWarningCircleBold
        onClick={editTaskHandler}
        className="text-gray-700 text-xl cursor-pointer"
      />
    </div>
  );
}

export default TaskBox;
