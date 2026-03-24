import { Router } from "express";
import {
  getLeaderboard,
  getUserRank,
  updateUserStats,
  getTopPerformers,
} from "../controllers/leaderboardController";
import { authenticate } from "../middlewares";

const router = Router();

router.get("/", authenticate, getLeaderboard);
router.get("/rank", authenticate, getUserRank);
router.get("/rank/:userId", authenticate, getUserRank);
router.get("/top-performers", authenticate, getTopPerformers);
router.put("/stats", authenticate, updateUserStats);
router.put("/stats/:userId", authenticate, updateUserStats);

export default router;
