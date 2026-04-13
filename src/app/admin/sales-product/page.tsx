"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { mockSalesProduct } from "@/data/mock-sales";
import { mockTeachers } from "@/data/mock-teachers";
import { mockPayments } from "@/data/mock-payments";
import FilterBar from "@/components/admin/FilterBar";
import DataTable, { Column } from "@/components/admin/DataTable";
import DatePicker from "@/components/shared/DatePicker";
import Dropdown from "@/components/shared/Dropdown";
import type { SalesProductData } from "@/types";

const BarChart = dynamic(() => import("recharts").then((m) => m.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then((m) => m.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then((m) => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const Legend = dynamic(() => import("recharts").then((m) => m.Legend), { ssr: false });
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

const tableColumns: Column<SalesProductData>[] = [
  { key: "productName", label: "상품명" },
  { key: "salesCount", label: "판매개수", render: (item) => `${item.salesCount}개` },
  {
    key: "salesAmount",
    label: "판매금액",
    render: (item) => `₩${item.salesAmount.toLocaleString()}`,
  },
  {
    key: "refundAmount",
    label: "환불금액",
    render: (item) => `₩${item.refundAmount.toLocaleString()}`,
  },
  {
    key: "netSalesAmount",
    label: "순판매금액",
    render: (item) => `₩${item.netSalesAmount.toLocaleString()}`,
  },
];

export default function SalesProductPage() {
  const [startDate, setStartDate] = useState("2026-03-01");
  const [endDate, setEndDate] = useState("2026-03-15");
  const [teacher, setTeacher] = useState("");
  const [course, setCourse] = useState("");

  const chartData = mockSalesProduct.map((p) => ({
    name: p.productName,
    판매금액: p.salesAmount,
    순판매금액: p.netSalesAmount,
  }));

  const filtered = course
    ? mockSalesProduct.filter((p) => p.productName === course)
    : mockSalesProduct;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-admin-text mb-6">매출 상품별</h1>

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

      <div className="bg-admin-card border border-admin-border rounded-lg p-4 mb-6">
        <p className="text-xs font-semibold text-admin-text-muted uppercase tracking-wider mb-4">
          상품별 매출 비교
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            margin={{ top: 4, right: 16, left: 0, bottom: 40 }}
            barCategoryGap="30%"
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#8b9aa8" }}
              angle={-30}
              textAnchor="end"
              interval={0}
            />
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
              formatter={(value, name) => [
                `₩${Number(value).toLocaleString()}`,
                String(name),
              ]}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", color: "#8b9aa8", paddingTop: "8px" }}
            />
            <Bar dataKey="판매금액" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="순판매금액" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <DataTable
        columns={tableColumns}
        data={filtered}
        keyExtractor={(item) => item.productName}
        emptyMessage="데이터가 없습니다."
      />
    </div>
  );
}
