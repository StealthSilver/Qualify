import { Request, Response } from "express";
import { UserStats } from "../models/UserStatsModel";
import { User } from "../models/UserModel";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { limit = 100, timeFrame = "all" } = req.query;
    
    const leaderboardData = await UserStats.find()
      .populate("userId", "name email")
      .sort({ rankPoints: -1, totalScore: -1 })
      .limit(Number(limit))
      .lean();

    const formattedLeaderboard = leaderboardData.map((stats, index) => {
      const user = stats.userId as any;
      return {
        rank: index + 1,
        userId: user._id,
        name: user.name,
        email: user.email,
        totalQuestionsAttempted: stats.totalQuestionsAttempted,
        totalQuestionsCorrect: stats.totalQuestionsCorrect,
        averageAccuracy: stats.averageAccuracy,
        totalScore: stats.totalScore,
        rankPoints: stats.rankPoints,
        currentStreak: stats.currentStreak,
        longestStreak: stats.longestStreak,
        totalTimeSpent: stats.totalTimeSpent,
        subjectWiseStats: stats.subjectWiseStats,
      };
    });

    res.status(200).json({
      success: true,
      message: "Leaderboard fetched successfully",
      data: formattedLeaderboard,
      count: formattedLeaderboard.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getUserRank = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId || (req as any).user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const userStats = await UserStats.findOne({ userId }).lean();

    if (!userStats) {
      return res.status(404).json({
        success: false,
        message: "User stats not found",
      });
    }

    const rank = await UserStats.countDocuments({
      $or: [
        { rankPoints: { $gt: userStats.rankPoints } },
        {
          rankPoints: userStats.rankPoints,
          totalScore: { $gt: userStats.totalScore },
        },
      ],
    });

    const totalUsers = await UserStats.countDocuments();

    res.status(200).json({
      success: true,
      message: "User rank fetched successfully",
      data: {
        rank: rank + 1,
        totalUsers,
        percentile: ((totalUsers - rank) / totalUsers) * 100,
        userStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user rank",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateUserStats = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId || (req as any).user?.id;
    const updateData = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    let userStats = await UserStats.findOne({ userId });

    if (!userStats) {
      userStats = new UserStats({ userId, ...updateData });
    } else {
      Object.assign(userStats, updateData);
      
      if (userStats.totalQuestionsAttempted > 0) {
        userStats.averageAccuracy = 
          (userStats.totalQuestionsCorrect / userStats.totalQuestionsAttempted) * 100;
      }
      
      userStats.rankPoints = calculateRankPoints(userStats);
    }

    await userStats.save();

    res.status(200).json({
      success: true,
      message: "User stats updated successfully",
      data: userStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user stats",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getTopPerformers = async (req: Request, res: Response) => {
  try {
    const { subject, limit = 10 } = req.query;

    let query: any = {};
    
    if (subject) {
      query["subjectWiseStats.subject"] = subject;
    }

    const topPerformers = await UserStats.find(query)
      .populate("userId", "name email")
      .sort({ rankPoints: -1, averageAccuracy: -1 })
      .limit(Number(limit))
      .lean();

    const formattedData = topPerformers.map((stats, index) => {
      const user = stats.userId as any;
      let subjectStats = null;
      
      if (subject) {
        subjectStats = stats.subjectWiseStats.find(
          (s) => s.subject === subject
        );
      }

      return {
        rank: index + 1,
        userId: user._id,
        name: user.name,
        email: user.email,
        averageAccuracy: stats.averageAccuracy,
        totalScore: stats.totalScore,
        rankPoints: stats.rankPoints,
        subjectStats,
      };
    });

    res.status(200).json({
      success: true,
      message: "Top performers fetched successfully",
      data: formattedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch top performers",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

function calculateRankPoints(stats: any): number {
  const accuracyPoints = stats.averageAccuracy * 10;
  const volumePoints = stats.totalQuestionsAttempted * 2;
  const streakBonus = stats.currentStreak * 50;
  const scorePoints = stats.totalScore;

  return Math.round(accuracyPoints + volumePoints + streakBonus + scorePoints);
}
