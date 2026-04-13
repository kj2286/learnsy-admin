"use client";

import { useState } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import DataTable, { Column } from "@/components/admin/DataTable";
import SearchInput from "@/components/shared/SearchInput";
import Dropdown from "@/components/shared/Dropdown";
import { mockStudents } from "@/data/mock-students";
import { mockCourses } from "@/data/mock-courses";
import type { Student } from "@/types";

export default function AssignCoursePage() {
  const [emailSearch, setEmailSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<Record<string, string>>({});
  const [assigned, setAssigned] = useState<Record<string, boolean>>({});

  const courseOptions = [
    { value: "", label: "강의 선택" },
    ...mockCourses.map((c) => ({ value: c.code, label: c.name })),
  ];

  const filtered = mockStudents.filter((s) => {
    const emailMatch = s.email.toLowerCase().includes(emailSearch.toLowerCase());
    const nameMatch = s.name.includes(nameSearch);
    const courseMatch =
      courseSearch === "" ||
      s.courses.some((c) => c.courseName.includes(courseSearch));
    return emailMatch && nameMatch && courseMatch;
  });

  const handleAssign = (studentId: string) => {
    if (!selectedCourses[studentId]) return;
    setAssigned((prev) => ({ ...prev, [studentId]: true }));
    setTimeout(() => {
      setAssigned((prev) => ({ ...prev, [studentId]: false }));
    }, 2000);
  };

  const columns: Column<Student>[] = [
    {
      key: "registeredAt",
      label: "회원가입일",
      render: (s) => <span className="text-admin-text-muted">{s.registeredAt}</span>,
    },
    {
      key: "name",
      label: "이름",
      render: (s) => <span className="font-medium">{s.name}</span>,
    },
    {
      key: "email",
      label: "이메일",
      render: (s) => <span className="text-admin-text-muted">{s.email}</span>,
    },
    {
      key: "courseSelect",
      label: "강의 선택",
      render: (s) => (
        <Dropdown
          options={courseOptions}
          value={selectedCourses[s.id] || ""}
          onChange={(val) =>
            setSelectedCourses((prev) => ({ ...prev, [s.id]: val }))
          }
          className="min-w-[160px]"
        />
      ),
    },
    {
      key: "assignAction",
      label: "강의 부여",
      render: (s) => (
        <button
          onClick={() => handleAssign(s.id)}
          disabled={!selectedCourses[s.id]}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            assigned[s.id]
              ? "bg-green-500/20 text-green-400"
              : selectedCourses[s.id]
              ? "bg-admin-accent hover:bg-admin-accent/80 text-white"
              : "bg-admin-card border border-admin-border text-admin-text-muted cursor-not-allowed"
          }`}
        >
          <ArrowDown size={14} weight="light" />
          {assigned[s.id] ? "부여 완료" : "강의 부여"}
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-admin-text mb-6">강의 부여</h1>

      <div className="flex flex-wrap gap-3 mb-4">
        <SearchInput
          placeholder="이메일 검색"
          value={emailSearch}
          onChange={setEmailSearch}
          className="w-56"
        />
        <SearchInput
          placeholder="이름 검색"
          value={nameSearch}
          onChange={setNameSearch}
          className="w-44"
        />
        <SearchInput
          placeholder="강의 검색"
          value={courseSearch}
          onChange={setCourseSearch}
          className="w-44"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(s) => s.id}
        emptyMessage="검색 결과가 없습니다."
      />
    </div>
  );
}
