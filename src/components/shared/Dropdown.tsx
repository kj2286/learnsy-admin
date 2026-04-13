"use client";

interface DropdownProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  dark?: boolean;
}

export default function Dropdown({ label, options, value, onChange, className = "", dark = true }: DropdownProps) {
  return (
    <div className={className}>
      {label && (
        <label className={`block text-xs font-medium mb-1 ${dark ? "text-admin-text-muted" : "text-gray-500"}`}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors cursor-pointer ${
          dark
            ? "bg-admin-card border border-admin-border text-admin-text focus:border-admin-accent"
            : "bg-white border border-gray-200 text-gray-900 focus:border-blue-500"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
