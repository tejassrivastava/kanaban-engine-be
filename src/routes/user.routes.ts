import { Router } from "express";

import { createUser } from "../controllers/user.controller";

const router = Router();

router.post("/create", createUser);

export { router as userRouter };
