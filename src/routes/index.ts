import { Router } from "express";
import { taskRouter } from "./task.routes";
import { userRouter } from "./user.routes";
import verifyToken from "../middleware/auth";
import { authRouter } from "./auth.routes";
import { tasksRouter } from "./tasks.routes";

const baseRouter = Router();

baseRouter.use("/auth", authRouter);

baseRouter.use("/user", userRouter);

baseRouter.use("/task", verifyToken, taskRouter);

baseRouter.use("/tasks", verifyToken, tasksRouter);

export default baseRouter;
