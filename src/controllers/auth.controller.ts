import { Request, Response } from "express";
import userService from "../services/user.service";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

// Login User
const signInUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const user = await userService.getUser(name, password);

    if (!user || user.password !== password) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      // If the user is found and the password matches, generate a new token using jwt and uuid
      const token = jwt.sign({ id: uuid() }, "secret");
      // Update the user's token in the database
      await userService.updateUser(name, token);
      // Send a success response with the token
      res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  signInUser,
};
