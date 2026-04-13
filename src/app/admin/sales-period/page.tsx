"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { mockSalesPeriod } from "@/data/mock-sales";
import { mockTeachers } from "@/data/mock-teachers";
import { mockPayments } from "@/data/mock-payments";
import FilterBar from "@/components/admin/FilterBar";
import DataTable, { Column } from "@/components/admin/DataTable";
import DatePicker from "@/components/shared/DatePicker";
import Dropdown from "@/components/shared/Dropdown";
import type { SalesPeriodData } from "@/types";

const LineChart = dynamic(() => import("recharts").then((m) => m.LineChart), { ssr: false });
const Line = dynamic(() => import("recharts").then((m) => m.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then((m) => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then((m) => m.ResponsiveContainer), { ssr: false });

const teacherOptions = [
  { value: "", label: "전체 강사" },
  ...mockTeachers.map((t) => ({ value: t.name, label: t.name })),
];

const courseOptions = [
  { value: "", label: "전체 강의" },
  ...Array.from(new Set(mockPayments.map((p) => p.courseName))).map((c) => ({
    value: c,
    label: c,
  })),
];

const summaryColumns: Column<SalesPeriodData>[] = [
  { key: "date", label: "날짜" },
  { key: "count", label: "결제건수", render: (item) => `${item.count}건` },
  {
    key: "amount",
    label: "결제금액",
    render: (item) => `₩${item.amount.toLocaleString()}`,
  },
];

export default function SalesPeriodPage() {
  const [startDate, setStartDate] = useState("2026-03-01");
  const [endDate, setEndDate] = useState("2026-03-15");
  const [teacher, setTeacher] = useState("");
  const [course, setCourse] = useState("");

  const filtered = mockSalesPeriod.filter((d) => {
    if (startDate && d.date < startDate) return false;
    if (endDate && d.date > endDate) return false;
    return true;
  });

  const chartData = filtered.map((d) => ({
    ...d,
    date: d.date.slice(5),
  }));

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-admin-text mb-6">매출 기간별</h1>

      <FilterBar>
        <DatePicker label="시작일" value={startDate} onChange={setStartDate} className="w-40" />
        <DatePicker label="종료일" value={endDate} onChange={setEndDate} className="w-40" />
        <Dropdown
          label="강사"
          options={teacherOptions}
          value={teacher}
          onChange={setTeacher}
          className="w-36"
        />
        <Dropdown
          label="강의"
          options={courseOptions}
          value={course}
          onChange={setCourse}
          className="w-44"
        />
      </FilterBar>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-admin-card border border-admin-border rounded-lg p-4">
          <p className="text-xs font-semibold text-admin-text-muted uppercase tracking-wider mb-4">
            결제건수 추이
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8b9aa8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#8b9aa8" }} />
              <Tooltip
                contentStyle={{
                  background: "#1a2230",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#e2e8f0",
                }}
                formatter={(value) => [`${value}건`, "결제건수"]}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 3, fill: "#22c55e" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-admin-card border border-admin-border rounded-lg p-4">
          <p className="text-xs font-semibold text-admin-text-muted uppercase tracking-wider mb-4">
            결제금액 추이
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8b9aa8" }} />
              <YAxis
                tick={{ fontSize: 11, fill: "#8b9aa8" }}
                tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a2230",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#e2e8f0",
                }}
                formatter={(value) => [`₩${Number(value).toLocaleString()}`, "결제금액"]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3, fill: "#3b82f6" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable
        columns={summaryColumns}
        data={filtered}
        keyExtractor={(item) => item.date}
        emptyMessage="해당 기간의 데이터가 없습니다."
      />
    </div>
  );
}
