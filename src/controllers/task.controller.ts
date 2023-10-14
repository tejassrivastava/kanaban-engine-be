import { Request, Response, NextFunction } from "express";
import {
  createTaskService,
  deleteTaskService,
  getTaskByIdService,
  updateTaskService,
} from "../services/task.service";
import { ITask } from "../models/Task";

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const taskData: ITask = req.body;
    const task = await createTaskService(taskData);
    res.status(201).json({ msg: "Task Created Successfully", data: task });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve a task by its ID
export const getTaskById = async (req: Request, res: Response) => {
  console.log("in getTaskbyId");
  try {
    const taskId = req.params.id;
    const task = await getTaskByIdService(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a specific task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const updatedTaskData: ITask = req.body;
    const updatedTask = await updateTaskService(taskId, updatedTaskData);
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ msg: "Task Updated Successfully", data: updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a specific task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await deleteTaskService(taskId);
    console.log("deletedTask : ", deletedTask);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ msg: "Task Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
