import { Router } from "express";
import { signup, signin, getProfile } from "../controllers";
import { authenticate } from "../middlewares";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", authenticate, getProfile);

export default router;
