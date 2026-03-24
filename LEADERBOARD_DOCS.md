# Leaderboard System Documentation

## Overview

The Spardha leaderboard system provides real-time rankings of students based on their performance metrics including accuracy, questions attempted, streaks, and overall scores.

## Features

### Frontend Features
- **Real-time Updates**: Leaderboard data refreshes every 10 seconds automatically
- **Multiple Views**: Filter by overall performance or specific subjects (Physics, Chemistry, Mathematics)
- **User Rank Display**: Shows current user's rank, percentile, and position among all students
- **Detailed Stats**: Expandable rows show subject-wise breakdown for each student
- **Top 3 Spotlight**: Special highlighting for top 3 performers with crown/medal icons
- **Responsive Design**: Mobile-friendly table with optimized columns for different screen sizes

### Backend Features
- **User Stats Tracking**: Comprehensive statistics for each user including:
  - Total questions attempted/correct/incorrect
  - Average accuracy
  - Current and longest streaks
  - Total time spent
  - Subject-wise and chapter-wise breakdowns
  - Recent activity history
  
- **Ranking Algorithm**: Points calculated from:
  - Accuracy: 10 points per 1% accuracy
  - Volume: 2 points per question attempted
  - Streak: 50 points per day in current streak
  - Score: Direct score points earned

## API Endpoints

### GET /api/leaderboard
Fetch the full leaderboard with all students ranked by performance.

**Query Parameters:**
- `limit` (optional, default: 100): Maximum number of entries to return
- `timeFrame` (optional, default: "all"): Time frame for filtering (future feature)

**Response:**
```json
{
  "success": true,
  "message": "Leaderboard fetched successfully",
  "data": [
    {
      "rank": 1,
      "userId": "user_id",
      "name": "Student Name",
      "email": "student@example.com",
      "totalQuestionsAttempted": 500,
      "totalQuestionsCorrect": 450,
      "averageAccuracy": 90,
      "totalScore": 1250,
      "rankPoints": 2850,
      "currentStreak": 15,
      "longestStreak": 20,
      "totalTimeSpent": 150,
      "subjectWiseStats": [...]
    }
  ],
  "count": 100
}
```

### GET /api/leaderboard/rank/:userId?
Get the rank information for a specific user or the authenticated user.

**Response:**
```json
{
  "success": true,
  "message": "User rank fetched successfully",
  "data": {
    "rank": 15,
    "totalUsers": 500,
    "percentile": 97.0,
    "userStats": { ... }
  }
}
```

### GET /api/leaderboard/top-performers
Get top performers, optionally filtered by subject.

**Query Parameters:**
- `subject` (optional): Filter by specific subject
- `limit` (optional, default: 10): Number of top performers to return

### PUT /api/leaderboard/stats/:userId?
Update user statistics. Automatically recalculates accuracy and rank points.

**Request Body:**
```json
{
  "totalQuestionsAttempted": 500,
  "totalQuestionsCorrect": 450,
  "currentStreak": 15,
  "totalTimeSpent": 150,
  "subjectWiseStats": [...]
}
```

### POST /api/seed/user-stats
Seed the database with mock user statistics for testing (Admin only).

## Database Schema

### UserStats Collection
```typescript
{
  userId: ObjectId (ref: User),
  totalQuestionsAttempted: Number,
  totalQuestionsCorrect: Number,
  totalQuestionsIncorrect: Number,
  totalTimeSpent: Number (hours),
  averageAccuracy: Number (0-100),
  currentStreak: Number (days),
  longestStreak: Number (days),
  totalScore: Number,
  rankPoints: Number,
  subjectWiseStats: [{
    subject: String,
    questionsAttempted: Number,
    questionsCorrect: Number,
    accuracy: Number,
    timeSpent: Number
  }],
  chapterWiseStats: [{
    subject: String,
    chapter: String,
    questionsAttempted: Number,
    questionsCorrect: Number,
    accuracy: Number
  }],
  recentActivity: [{
    date: Date,
    questionsAttempted: Number,
    questionsCorrect: Number,
    timeSpent: Number
  }],
  lastActivityDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Testing

### Initial Setup
1. Start the backend server
2. Create some test users (students)
3. Seed user stats: `POST /api/seed/user-stats` (requires admin authentication)
4. Navigate to `/dashboard/leaderboard` in the frontend

### Mock Data Fallback
If the backend is not available, the frontend will automatically generate mock data for demonstration purposes.

## Future Enhancements
- Weekly/Monthly leaderboard views
- Subject-specific leaderboards
- Friend rankings
- Achievement badges
- Historical rank tracking
- Push notifications for rank changes
- Export leaderboard data
