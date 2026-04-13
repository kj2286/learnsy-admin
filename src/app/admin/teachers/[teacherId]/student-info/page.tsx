"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowClockwise, ClockCounterClockwise } from "@phosphor-icons/react";
import { mockStudents } from "@/data/mock-students";
import { mockCourses } from "@/data/mock-courses";
import FilterBar from "@/components/admin/FilterBar";
import DataTable, { Column } from "@/components/admin/DataTable";
import SearchInput from "@/components/shared/SearchInput";
import type { Student } from "@/types";

export default function TeacherStudentInfoPage() {
  const params = useParams();
  const teacherId = params.teacherId as string;

  const [searchNumber, setSearchNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const teacherCourseCodes = mockCourses
    .filter((c) => c.teacherId === teacherId)
    .map((c) => c.code);

  const teacherStudents = mockStudents.filter((s) =>
    s.courses.some((c) => teacherCourseCodes.includes(c.courseCode))
  );

  const filtered = teacherStudents.filter((s) => {
    if (searchNumber && !s.studentNumber.includes(searchNumber)) return false;
    if (searchName && !s.name.includes(searchName)) return false;
    return true;
  });

  const columns: Column<Student>[] = [
    { key: "studentNumber", label: "학생번호" },
    { key: "registeredAt", label: "가입일" },
    { key: "name", label: "이름" },
    { key: "email", label: "이메일" },
    {
      key: "parentInfo",
      label: "부모님 정보",
      render: (item) =>
        item.parentName ? (
          <div className="flex flex-col gap-0.5">
            <span className="text-admin-text">{item.parentName}</span>
            <span className="text-xs text-admin-text-muted">{item.parentPhone}</span>
          </div>
        ) : (
          <span className="text-admin-text-muted">-</span>
        ),
    },
    { key: "phone", label: "전화번호" },
    { key: "birthday", label: "생일" },
    { key: "age", label: "나이", render: (item) => `${item.age}세` },
    { key: "gender", label: "성별" },
    { key: "mathGrade", label: "수학등급" },
    {
      key: "selectedSubjects",
      label: "선택과목",
      render: (item) =>
        item.selectedSubjects.length > 0 ? item.selectedSubjects.join(", ") : "-",
    },
    {
      key: "history",
      label: "히스토리",
      render: () => (
        <button className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-admin-card border border-admin-border text-admin-text-muted hover:text-admin-text transition-colors">
          <ClockCounterClockwise size={13} weight="light" />
          보기
        </button>
      ),
    },
    {
      key: "courses",
      label: "진행 중 강의",
      render: (item) => {
        const active = item.courses.filter((c) => c.status === "진행중");
        if (active.length === 0) return <span className="text-admin-text-muted">-</span>;
        return (
          <div className="flex flex-col gap-1">
            {active.map((c) => (
              <div key={c.courseCode} className="flex flex-col">
                <span className="text-admin-text text-xs font-medium">{c.courseName}</span>
                <span className="text-admin-text-muted text-xs">
                  {c.startDate} ~ {c.endDate}
                </span>
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-admin-text mb-6">학생 정보</h1>

      <FilterBar>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-admin-text-muted">학생번호</span>
          <SearchInput placeholder="학생번호 검색..." value={searchNumber} onChange={setSearchNumber} className="w-36" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-admin-text-muted">이름</span>
          <SearchInput placeholder="이름 검색..." value={searchName} onChange={setSearchName} className="w-36" />
        </div>
        <div className="flex items-end">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-admin-card border border-admin-border text-admin-text text-sm hover:bg-white/[0.05] transition-colors">
            <ArrowClockwise size={15} weight="light" />
            새로고침
          </button>
        </div>
      </FilterBar>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(item) => item.id}
        emptyMessage="학생 정보가 없습니다."
      />
    </div>
  );
}
