import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models";
import { AuthRequest } from "./authenticate";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthRequest).user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!allowedRoles.includes(user.role as UserRole)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
        requiredRoles: allowedRoles,
        userRole: user.role,
      });
    }

    next();
  };
};

export const isAdmin = authorize(UserRole.ADMIN);
export const isMentor = authorize(UserRole.ADMIN, UserRole.MENTOR);
export const isStudent = authorize(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT);
