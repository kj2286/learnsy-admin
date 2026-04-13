"use client";

import { useState } from "react";
import { mockPayments } from "@/data/mock-payments";
import { mockTeachers } from "@/data/mock-teachers";
import FilterBar from "@/components/admin/FilterBar";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import SearchInput from "@/components/shared/SearchInput";
import Dropdown from "@/components/shared/Dropdown";
import type { Payment } from "@/types";

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

const statusOptions = [
  { value: "", label: "전체 상태" },
  { value: "성공", label: "성공" },
  { value: "실패", label: "실패" },
];

const columns: Column<Payment>[] = [
  { key: "studentName", label: "이름" },
  {
    key: "status",
    label: "상태",
    render: (item) => <StatusBadge status={item.status} />,
  },
  { key: "paymentDate", label: "결제일" },
  {
    key: "amount",
    label: "결제금액",
    render: (item) => `₩${item.amount.toLocaleString()}`,
  },
  {
    key: "refundAmount",
    label: "환불액",
    render: (item) => `₩${item.refundAmount.toLocaleString()}`,
  },
  {
    key: "netAmount",
    label: "순결제액",
    render: (item) => `₩${item.netAmount.toLocaleString()}`,
  },
  { key: "teacherName", label: "강사" },
  { key: "courseName", label: "강의명" },
];

export default function PaymentsPage() {
  const [teacher, setTeacher] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const filtered = mockPayments.filter((p) => {
    if (teacher && p.teacherName !== teacher) return false;
    if (course && p.courseName !== course) return false;
    if (status && p.status !== status) return false;
    if (search && !p.studentName.includes(search)) return false;
    return true;
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-admin-text mb-6">결제 내역</h1>

      <FilterBar>
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
        <Dropdown
          label="결제 상태"
          options={statusOptions}
          value={status}
          onChange={setStatus}
          className="w-32"
        />
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-admin-text-muted">이름 검색</span>
          <SearchInput
            placeholder="이름 검색..."
            value={search}
            onChange={setSearch}
            className="w-48"
          />
        </div>
      </FilterBar>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(item) => item.id}
        emptyMessage="결제 내역이 없습니다."
      />
    </div>
  );
}
