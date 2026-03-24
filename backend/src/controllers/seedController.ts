import { Request, Response } from "express";
import { UserStats } from "../models/UserStatsModel";
import { User } from "../models/UserModel";
import mongoose from "mongoose";

export const seedUserStats = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ role: "student" }).select("_id").lean();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No student users found. Create some users first.",
      });
    }

    const statsToCreate = [];

    for (const user of users) {
      const existingStats = await UserStats.findOne({ userId: user._id });
      
      if (!existingStats) {
        const questionsAttempted = Math.floor(Math.random() * 500) + 200;
        const accuracy = Math.floor(Math.random() * 25) + 70;
        const questionsCorrect = Math.floor((questionsAttempted * accuracy) / 100);
        const questionsIncorrect = questionsAttempted - questionsCorrect;
        const timeSpent = Math.floor(Math.random() * 200) + 100;
        const currentStreak = Math.floor(Math.random() * 30) + 5;
        const longestStreak = currentStreak + Math.floor(Math.random() * 20);
        const score = Math.floor(accuracy * 10 + questionsAttempted * 0.5);
        const rankPoints = Math.floor(accuracy * 10 + questionsAttempted * 2 + currentStreak * 50 + score);

        const physicsQuestions = Math.floor(questionsAttempted / 3);
        const chemistryQuestions = Math.floor(questionsAttempted / 3);
        const mathQuestions = questionsAttempted - physicsQuestions - chemistryQuestions;

        const physicsAccuracy = accuracy + Math.floor(Math.random() * 10) - 5;
        const chemistryAccuracy = accuracy + Math.floor(Math.random() * 10) - 5;
        const mathAccuracy = accuracy + Math.floor(Math.random() * 10) - 5;

        statsToCreate.push({
          userId: user._id,
          totalQuestionsAttempted: questionsAttempted,
          totalQuestionsCorrect: questionsCorrect,
          totalQuestionsIncorrect: questionsIncorrect,
          totalTimeSpent: timeSpent,
          averageAccuracy: accuracy,
          currentStreak: currentStreak,
          longestStreak: longestStreak,
          totalScore: score,
          rankPoints: rankPoints,
          subjectWiseStats: [
            {
              subject: 'Physics',
              questionsAttempted: physicsQuestions,
              questionsCorrect: Math.floor((physicsQuestions * physicsAccuracy) / 100),
              accuracy: physicsAccuracy,
              timeSpent: Math.floor(timeSpent / 3),
            },
            {
              subject: 'Chemistry',
              questionsAttempted: chemistryQuestions,
              questionsCorrect: Math.floor((chemistryQuestions * chemistryAccuracy) / 100),
              accuracy: chemistryAccuracy,
              timeSpent: Math.floor(timeSpent / 3),
            },
            {
              subject: 'Mathematics',
              questionsAttempted: mathQuestions,
              questionsCorrect: Math.floor((mathQuestions * mathAccuracy) / 100),
              accuracy: mathAccuracy,
              timeSpent: timeSpent - Math.floor(timeSpent * 2 / 3),
            },
          ],
          chapterWiseStats: [],
          recentActivity: generateRecentActivity(questionsAttempted, accuracy),
          lastActivityDate: new Date(),
        });
      }
    }

    if (statsToCreate.length > 0) {
      await UserStats.insertMany(statsToCreate);
      
      res.status(201).json({
        success: true,
        message: `Successfully created stats for ${statsToCreate.length} users`,
        data: { count: statsToCreate.length },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "All users already have stats",
        data: { count: 0 },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to seed user stats",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

function generateRecentActivity(totalQuestions: number, avgAccuracy: number) {
  const activities = [];
  const daysToGenerate = 7;

  for (let i = 0; i < daysToGenerate; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const dailyQuestions = Math.floor(Math.random() * 50) + 10;
    const dailyAccuracy = avgAccuracy + Math.floor(Math.random() * 10) - 5;
    const dailyCorrect = Math.floor((dailyQuestions * dailyAccuracy) / 100);

    activities.push({
      date,
      questionsAttempted: dailyQuestions,
      questionsCorrect: dailyCorrect,
      timeSpent: Math.floor(Math.random() * 4) + 1,
    });
  }

  return activities;
}
