import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const inputClassName =
  'w-full pl-4 pr-11 py-2.5 xs:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393f5b]/50 focus:border-[#393f5b] transition-all duration-300 text-sm xs:text-base';

type PasswordInputWithToggleProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
};

export default function PasswordInputWithToggle({
  id,
  value,
  onChange,
  required,
  minLength,
  autoComplete = 'current-password',
}: PasswordInputWithToggleProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClassName}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#070a05]/45 hover:text-[#393f5b] hover:bg-[#393f5b]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#393f5b]/40"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <EyeOff className="size-[1.125rem] xs:size-5" strokeWidth={1.75} /> : <Eye className="size-[1.125rem] xs:size-5" strokeWidth={1.75} />}
      </button>
    </div>
  );
}
