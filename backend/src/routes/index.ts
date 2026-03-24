import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import leaderboardRoutes from "./leaderboardRoutes";
import { seedUserStats } from "../controllers";
import { authenticate, isAdmin } from "../middlewares";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/leaderboard", leaderboardRoutes);

router.post("/seed/user-stats", authenticate, isAdmin, seedUserStats);

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

export default router;
