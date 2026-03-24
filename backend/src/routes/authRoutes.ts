import { Router } from "express";
import { signup, signin, getProfile, updateProfile } from "../controllers";
import { authenticate } from "../middlewares";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", authenticate, getProfile);
router.patch("/profile", authenticate, updateProfile);

export default router;
