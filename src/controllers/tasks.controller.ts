import { Request, Response, NextFunction } from "express";

import {
  getAllTasksService,
  getTasksByAssignedToService,
  getTasksByCategoryService,
} from "../services/tasks.service";

// Retrieve all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { limit, page, sort }: any = req.query;
    const { tasks, count } = await getAllTasksService(limit, page, sort);
    res.json({
      tasks: tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve all tasks assigned to a specific user
export const getTasksByAssignedTo = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const tasks = await getTasksByAssignedToService(username);
    if (tasks && tasks.length > 0) {
      res.json(tasks);
    } else {
      res.status(404).json({ msg: "No task Found Assigned to the user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve all tasks under a specific category
export const getTasksByCategory = async (req: Request, res: Response) => {
  try {
    const categoryName = req.params.categoryName;
    const tasks = await getTasksByCategoryService(categoryName);
    if (tasks && tasks.length > 0) {
      res.json(tasks);
    } else {
      res.status(404).json({ msg: "No task Found For Given Category" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
