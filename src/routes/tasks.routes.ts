import { Router } from "express";
import {
  getAllTasks,
  getTasksByAssignedTo,
  getTasksByCategory,
} from "../controllers/tasks.controller";
import schemaValidator from "../middleware/schemaValidator";

const router = Router();

router.get("/", schemaValidator("getAllTasks"), getAllTasks);
router.get(
  "/assignedTo/:username",
  schemaValidator("getTasksByAssignedTo"),
  getTasksByAssignedTo
);
router.get(
  "/category/:categoryName",
  schemaValidator("getTasksByCategory"),
  getTasksByCategory
);

export { router as tasksRouter };
