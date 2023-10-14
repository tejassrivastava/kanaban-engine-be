import { Router } from "express";

import authController from "../controllers/auth.controller";

const router = Router();

router.post("/signin", authController.signInUser);

export { router as authRouter };
