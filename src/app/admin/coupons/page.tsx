"use client";

import { useState } from "react";
import { Trash } from "@phosphor-icons/react";
import DataTable, { Column } from "@/components/admin/DataTable";
import Dropdown from "@/components/shared/Dropdown";
import { mockCoupons } from "@/data/mock-coupons";
import type { Coupon } from "@/types";

const teacherOptions = [
  { value: "", label: "전체 강사" },
  { value: "김수학", label: "김수학" },
  { value: "이정석", label: "이정석" },
  { value: "박미래", label: "박미래" },
  { value: "전체", label: "전체 공통" },
];

export default function CouponsPage() {
  const [teacherFilter, setTeacherFilter] = useState("");
  const [coupons, setCoupons] = useState(mockCoupons);

  const filtered = coupons.filter((c) =>
    teacherFilter === "" ? true : c.teacherName === teacherFilter
  );

  const handleDelete = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const columns: Column<Coupon>[] = [
    {
      key: "issuedDate",
      label: "쿠폰 발행일",
      render: (c) => <span className="text-admin-text-muted">{c.issuedDate}</span>,
    },
    {
      key: "name",
      label: "쿠폰 이름",
      render: (c) => <span className="font-medium">{c.name}</span>,
    },
    {
      key: "code",
      label: "쿠폰 코드",
      render: (c) => (
        <span className="font-mono text-xs bg-admin-card border border-admin-border px-2 py-0.5 rounded text-admin-text">
          {c.code}
        </span>
      ),
    },
    {
      key: "isDuplicate",
      label: "중복사용",
      render: (c) => (
        <input
          type="checkbox"
          checked={c.isDuplicate}
          readOnly
          className="w-4 h-4 accent-admin-accent cursor-default"
        />
      ),
    },
    {
      key: "type",
      label: "타입",
      render: (c) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-admin-card border border-admin-border text-admin-text-muted">
          {c.type}
        </span>
      ),
    },
    {
      key: "discountValue",
      label: "할인액",
      render: (c) => <span className="text-admin-text">{c.discountValue}</span>,
    },
    {
      key: "teacherName",
      label: "적용 선생님",
      render: (c) => <span className="text-admin-text-muted">{c.teacherName}</span>,
    },
    {
      key: "appliedCourses",
      label: "적용 클래스",
      render: (c) => (
        <span className="text-admin-text-muted text-xs">{c.appliedCourses}</span>
      ),
    },
    {
      key: "usedStudentCount",
      label: "사용 학생 수",
      render: (c) => (
        <span className="text-admin-text">{c.usedStudentCount.toLocaleString()}명</span>
      ),
    },
    {
      key: "usedPaymentCount",
      label: "사용 결제건수",
      render: (c) => (
        <span className="text-admin-text">{c.usedPaymentCount.toLocaleString()}건</span>
      ),
    },
    {
      key: "delete",
      label: "삭제",
      render: (c) => (
        <button
          onClick={() => handleDelete(c.id)}
          className="p-1.5 rounded-lg hover:bg-red-500/10 text-admin-text-muted hover:text-red-400 transition-colors"
        >
          <Trash size={16} weight="light" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-admin-text">쿠폰 발급</h1>
        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
          쿠폰 발급
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <Dropdown
          label="강사 선택"
          options={teacherOptions}
          value={teacherFilter}
          onChange={setTeacherFilter}
          className="w-44"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(c) => c.id}
        emptyMessage="쿠폰이 없습니다."
      />
    </div>
  );
}
