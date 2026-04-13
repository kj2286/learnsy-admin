"use client";

import { ReactNode } from "react";

interface FilterBarProps {
  children: ReactNode;
  className?: string;
}

export default function FilterBar({ children, className = "" }: FilterBarProps) {
  return (
    <div className={`flex flex-wrap items-end gap-3 p-4 rounded-lg bg-admin-card border border-admin-border mb-4 ${className}`}>
      {children}
    </div>
  );
}
