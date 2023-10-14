import Task, { ITask } from "../models/Task";

// Create a new task
export const createTaskService = async (taskData: ITask): Promise<ITask> => {
  const task = new Task(taskData);
  return await task.save();
};

// Retrieve a task by its ID
export const getTaskByIdService = async (
  taskId: string
): Promise<ITask | null> => {
  return await Task.findById(taskId);
};

// Update a specific task
export const updateTaskService = async (
  taskId: string,
  updatedTaskData: ITask
): Promise<ITask | null> => {
  return await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
};

// Delete a specific task
export const deleteTaskService = async (
  taskId: string
): Promise<ITask | null> => {
  return await Task.findByIdAndDelete(taskId);
};
