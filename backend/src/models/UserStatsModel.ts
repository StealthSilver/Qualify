import mongoose, { Schema } from "mongoose";

export interface IUserStats {
  userId: mongoose.Types.ObjectId;
  totalQuestionsAttempted: number;
  totalQuestionsCorrect: number;
  totalQuestionsIncorrect: number;
  totalTimeSpent: number;
  averageAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  totalScore: number;
  rankPoints: number;
  subjectWiseStats: {
    subject: string;
    questionsAttempted: number;
    questionsCorrect: number;
    accuracy: number;
    timeSpent: number;
  }[];
  chapterWiseStats: {
    subject: string;
    chapter: string;
    questionsAttempted: number;
    questionsCorrect: number;
    accuracy: number;
  }[];
  recentActivity: {
    date: Date;
    questionsAttempted: number;
    questionsCorrect: number;
    timeSpent: number;
  }[];
  lastActivityDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userStatsSchema = new Schema<IUserStats>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    totalQuestionsAttempted: {
      type: Number,
      default: 0,
    },
    totalQuestionsCorrect: {
      type: Number,
      default: 0,
    },
    totalQuestionsIncorrect: {
      type: Number,
      default: 0,
    },
    totalTimeSpent: {
      type: Number,
      default: 0,
    },
    averageAccuracy: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    rankPoints: {
      type: Number,
      default: 0,
    },
    subjectWiseStats: [
      {
        subject: String,
        questionsAttempted: { type: Number, default: 0 },
        questionsCorrect: { type: Number, default: 0 },
        accuracy: { type: Number, default: 0 },
        timeSpent: { type: Number, default: 0 },
      },
    ],
    chapterWiseStats: [
      {
        subject: String,
        chapter: String,
        questionsAttempted: { type: Number, default: 0 },
        questionsCorrect: { type: Number, default: 0 },
        accuracy: { type: Number, default: 0 },
      },
    ],
    recentActivity: [
      {
        date: Date,
        questionsAttempted: { type: Number, default: 0 },
        questionsCorrect: { type: Number, default: 0 },
        timeSpent: { type: Number, default: 0 },
      },
    ],
    lastActivityDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userStatsSchema.index({ userId: 1 });
userStatsSchema.index({ rankPoints: -1 });
userStatsSchema.index({ totalScore: -1 });

export const UserStats = mongoose.model<IUserStats>("UserStats", userStatsSchema);
