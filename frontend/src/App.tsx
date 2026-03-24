import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import DailyPractice from './pages/DailyPractice';
import DPPTest from './pages/DPPTest';
import MockTests from './pages/MockTests';
import Analytics from './pages/Analytics';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/practice" element={<Practice />} />
        <Route path="/dashboard/daily-practice" element={<DailyPractice />} />
        <Route path="/dashboard/dpp/:date" element={<DPPTest />} />
        <Route path="/dashboard/mock-tests" element={<MockTests />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
