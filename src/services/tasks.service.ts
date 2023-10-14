import Task, { ITask } from "../models/Task";

// Retrieve all tasks
// export const getAllTasksService = async (): Promise<ITask[]> => {
//   return await Task.find();
// };

export const getAllTasksService = async (
  limit: number,
  page: any,
  sort: any
) => {
  const tasks = await Task.find()
    .sort({ [sort]: -1 })
    .skip((Number(page) - 1) * limit || 0)
    .limit(Number(limit) * 1 || 10);

  const count = await Task.find().count();

  return { tasks, count };
};

// Retrieve all tasks assigned to a specific user
export const getTasksByAssignedToService = async (
  username: string
): Promise<ITask[]> => {
  return await Task.find({ assignedTo: username });
};

// Retrieve all tasks under a specific category
export const getTasksByCategoryService = async (
  categoryName: string
): Promise<ITask[]> => {
  return await Task.find({ category: categoryName });
};
