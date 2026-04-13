"use client";

import { useState } from "react";
import { Plus, VideoCamera, File, ListChecks } from "@phosphor-icons/react";
import { mockContents, mockSchools, mockPlatformTeachers, getSchoolById, getPlatformTeacherById } from "@/data/mock-platform";
import DataTable, { type Column } from "@/components/admin/DataTable";
import FilterBar from "@/components/admin/FilterBar";
import Dropdown from "@/components/shared/Dropdown";
import type { Content } from "@/data/mock-platform";

const typeIcons: Record<string, { icon: typeof VideoCamera; label: string; color: string }> = {
  video: { icon: VideoCamera, label: "영상", color: "text-blue-400 bg-blue-400/10" },
  pdf: { icon: File, label: "PDF", color: "text-orange-400 bg-orange-400/10" },
  problem_set: { icon: ListChecks, label: "문제세트", color: "text-green-400 bg-green-400/10" },
};

export default function ContentPage() {
  const [schoolFilter, setSchoolFilter] = useState("all");

  const filtered = schoolFilter === "all"
    ? mockContents
    : mockContents.filter((c) => c.schoolId === schoolFilter);

  const columns: Column<Content>[] = [
    { key: "type", label: "유형", render: (item) => {
      const t = typeIcons[item.type];
      const Icon = t.icon;
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${t.color}`}>
          <Icon size={14} weight="light" />{t.label}
        </span>
      );
    }},
    { key: "title", label: "제목" },
    { key: "schoolId", label: "학교", render: (item) => getSchoolById(item.schoolId)?.name || "-" },
    { key: "grade", label: "학년", render: (item) => `${item.grade}학년` },
    { key: "assignedTeachers", label: "담당 강사", render: (item) =>
      item.assignedTeachers.length > 0
        ? item.assignedTeachers.map((id) => getPlatformTeacherById(id)?.name).filter(Boolean).join(", ")
        : <span className="text-admin-text-muted">미배정</span>
    },
    { key: "version", label: "버전" },
    { key: "createdAt", label: "등록일" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">콘텐츠 관리</h1>
          <p className="text-sm text-admin-text-muted mt-1">내신인강 영상, 교재, 문제 세트를 관리합니다</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-admin-accent text-white rounded-lg text-sm font-medium hover:bg-admin-accent-hover transition-colors">
          <Plus size={16} weight="bold" />
          콘텐츠 추가
        </button>
      </div>

      <FilterBar>
        <Dropdown
          label="학교"
          value={schoolFilter}
          onChange={setSchoolFilter}
          options={[{ value: "all", label: "전체" }, ...mockSchools.map((s) => ({ value: s.id, label: s.name }))]}
          className="w-48"
        />
      </FilterBar>

      <DataTable columns={columns} data={filtered} keyExtractor={(item) => item.id} />
    </div>
  );
}
