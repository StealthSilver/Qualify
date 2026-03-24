export const PREFERENCES_KEY = 'spardha_app_preferences';

export type AppPreferences = {
  emailNotifications: boolean;
  practiceReminders: boolean;
  soundEffects: boolean;
};

const defaultPreferences: AppPreferences = {
  emailNotifications: true,
  practiceReminders: true,
  soundEffects: true,
};

export function loadPreferences(): AppPreferences {
  try {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    if (!raw) return { ...defaultPreferences };
    const parsed = JSON.parse(raw) as Partial<AppPreferences>;
    return { ...defaultPreferences, ...parsed };
  } catch {
    return { ...defaultPreferences };
  }
}

export function savePreferences(prefs: AppPreferences) {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  window.dispatchEvent(
    new CustomEvent<AppPreferences>('spardha-preferences-changed', { detail: prefs })
  );
}

let sharedAudioContext: AudioContext | null = null;

/** Short click when choosing an option in mock tests; no-op if sound is off. */
export function playAnswerFeedbackSound() {
  if (!loadPreferences().soundEffects) return;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    if (!sharedAudioContext) sharedAudioContext = new AC();
    const ctx = sharedAudioContext;
    if (ctx.state === 'suspended') void ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = 660;
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc.start(t);
    osc.stop(t + 0.06);
  } catch {
    /* ignore */
  }
}
