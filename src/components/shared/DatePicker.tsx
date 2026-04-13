"use client";

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  dark?: boolean;
}

export default function DatePicker({ label, value, onChange, className = "", dark = true }: DatePickerProps) {
  return (
    <div className={className}>
      {label && (
        <label className={`block text-xs font-medium mb-1 ${dark ? "text-admin-text-muted" : "text-gray-500"}`}>
          {label}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors ${
          dark
            ? "bg-admin-card border border-admin-border text-admin-text focus:border-admin-accent [color-scheme:dark]"
            : "bg-white border border-gray-200 text-gray-900 focus:border-blue-500"
        }`}
      />
    </div>
  );
}
