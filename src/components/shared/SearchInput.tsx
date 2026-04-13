"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  dark?: boolean;
}

export default function SearchInput({ placeholder = "검색...", value, onChange, className = "", dark = true }: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <MagnifyingGlass
        size={16}
        weight="light"
        className={`absolute left-3 top-1/2 -translate-y-1/2 ${dark ? "text-admin-text-muted" : "text-gray-400"}`}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none transition-colors ${
          dark
            ? "bg-admin-card border border-admin-border text-admin-text placeholder:text-admin-text-muted focus:border-admin-accent"
            : "bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
        }`}
      />
    </div>
  );
}
