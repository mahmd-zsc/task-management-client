"use client";
"use client";
import { getTasks } from "@/lib/store/features/task/taskApiCall";
import { MdMenu } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";

function Complete() {
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.auth);

  // Checking if userData is not available, then redirecting to login page
  if (!userData) {
    redirect(`/login`);
  }

  let { tasks } = useSelector((state) => state.task);

  // Fetching tasks when the component mounts if tasks array is empty
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    }
  }, []);

  // Rendering tasks with the "Complete" title
  return (
    <div className="relative">
      <div className="flex items-center gap-4 text-2xl">
        <MdMenu />
        <h1 className="font-semibold">Complete</h1>
      </div>
      <div className="mt-10 flex flex-col gap-2">
        {tasks
          ?.filter((t) => t.isComplete)
          .map((t, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-gray-100 shadow-sm px-6 py-4"
            >
              <div className="w-5 h-5 rounded-full border-2 border-mainRed opacity-40 dark:opacity-100 bg-gray-700 duration-200 cursor-pointer p-2"></div>
              <p>{t.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Complete;
