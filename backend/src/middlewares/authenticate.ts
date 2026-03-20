import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please provide a valid token",
      });
    }

    const token = authHeader.substring(7);

    try {
      const decoded = verifyToken(token);
      (req as AuthRequest).user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (error: any) {
    console.error("Authentication error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};
