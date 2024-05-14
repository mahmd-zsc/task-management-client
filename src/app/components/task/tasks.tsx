"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "@/lib/store/features/task/taskApiCall";
import TaskBox from "./taskBox";
import EditTask from "./tditTask";
import SortCategory from ".tSortCategory";

function Tasks(): JSX.Element {
  // State for sorting tasks by category
  const [sort, setSort] = useState<string>("");

  // Array of available categories
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

  // Redux state selectors
  const { tasks, isTaskCreated, editTaskId, makeCompleted } = useSelector(
    (state) => state.task
  );

  // Redux dispatcher
  const dispatch = useDispatch();

  // Fetch tasks on component mount and on changes to task creation or completion
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch, isTaskCreated, makeCompleted]);

  // Filter tasks based on selected category
  const filteredTasks = tasks.filter((task) => {
    if (sort === "") {
      return !task.isComplete;
    } else {
      return task.category === sort && !task.isComplete;
    }
  });

  return (
    <div>
      {/* SortCategory component for filtering tasks */}
      <SortCategory categories={categories} sort={sort} setSort={setSort} />

      {/* Display filtered tasks */}
      <div className="mt-6 flex flex-col gap-2">
        {filteredTasks.map((task) => (
          <TaskBox key={task._id} task={task} />
        ))}
      </div>

      {/* EditTask component */}
      <div
        className={`${
          editTaskId ? "w-80 opacity-100" : "w-0 opacity-0"
        } fixed right-0 top-0 h-screen bg-gray-200 shadow-lg shadow-gray-600 overflow-hidden duration-300`}
      >
        <EditTask />
      </div>
    </div>
  );
}

export default Tasks;
