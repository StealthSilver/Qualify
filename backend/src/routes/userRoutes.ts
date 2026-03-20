import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers";
import { authenticate, isAdmin, isMentor } from "../middlewares";

const router = Router();

router.get("/", authenticate, isMentor, getUsers);
router.get("/:id", authenticate, getUserById);
router.post("/", authenticate, isAdmin, createUser);
router.put("/:id", authenticate, isAdmin, updateUser);
router.delete("/:id", authenticate, isAdmin, deleteUser);

export default router;
