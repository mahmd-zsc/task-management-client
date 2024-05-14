import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for the task
interface Task {
  _id: string;
  title: string;
  isComplete: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define the initial state
interface TaskState {
  tasks: Task[];
  isTaskCreated: boolean;
  editTaskId: string | null;
  task: object | null;
  makeCompleted: boolean;
}

const initialState: TaskState = {
  tasks: [],
  isTaskCreated: false,
  editTaskId: null,
  task: null,
  makeCompleted: false,
};

// Create the task slice
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    setTask(state, action: PayloadAction<object | null>) {
      state.task = action.payload;
    },
    setIsTaskCreated(state, action: PayloadAction<boolean>) {
      state.isTaskCreated = action.payload;
    },
    setEditTaskId(state, action: PayloadAction<string | null>) {
      state.editTaskId = action.payload;
    },
    setMakeCompleted(state) {
      state.makeCompleted = !state.makeCompleted;
    },

  },
});

// Export actions
export const taskActions = taskSlice.actions;

// Export reducer
export const taskReducer = taskSlice.reducer;
