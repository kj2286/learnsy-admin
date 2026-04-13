"use client";

import { ReactNode } from "react";

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "데이터가 없습니다.",
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-admin-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-admin-card border-b border-admin-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left text-xs font-semibold text-admin-text-muted uppercase tracking-wider ${col.className || ""}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-admin-border">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-admin-text-muted">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-white/[0.02] transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-admin-text ${col.className || ""}`}>
                    {col.render
                      ? col.render(item)
                      : String((item as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
