import { Router } from "express";
import {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import schemaValidator from "../middleware/schemaValidator";

const router = Router();

router.post("/", schemaValidator("createTask"), createTask);
router.get("/:id", schemaValidator("getTaskById"), getTaskById);
router.put("/:id", schemaValidator("updateTask"), updateTask);
router.delete("/:id", schemaValidator("deleteTask"), deleteTask);

export { router as taskRouter };
