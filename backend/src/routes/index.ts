import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

export default router;
