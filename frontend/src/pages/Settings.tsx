import { Settings as SettingsIcon } from 'lucide-react';
import PlaceholderPage from '../components/PlaceholderPage';

export default function Settings() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Manage your account settings, notification preferences, and customize your learning experience."
      icon={SettingsIcon}
    />
  );
}
