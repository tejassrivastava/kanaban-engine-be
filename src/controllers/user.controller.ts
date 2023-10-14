import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import userService from "../services/user.service";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  console.log("in createUser");
  try {
    const userData: IUser = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
