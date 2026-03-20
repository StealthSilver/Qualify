import { Calendar } from 'lucide-react';
import PlaceholderPage from '../components/PlaceholderPage';

export default function DailyPractice() {
  return (
    <PlaceholderPage
      title="Daily Practice"
      description="Complete your daily practice problems to maintain your streak. New questions are added every day at midnight."
      icon={Calendar}
    />
  );
}
