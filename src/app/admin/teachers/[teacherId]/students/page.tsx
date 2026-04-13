"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { MagnifyingGlass, DownloadSimple, Pause, Prohibit, PencilSimple } from "@phosphor-icons/react";
import { mockStudents } from "@/data/mock-students";
import { mockCourses, courseTabs } from "@/data/mock-courses";
import FilterBar from "@/components/admin/FilterBar";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import SearchInput from "@/components/shared/SearchInput";
import Dropdown from "@/components/shared/Dropdown";
import type { Student, CourseEnrollment } from "@/types";

const courseCodeColors: Record<string, string> = {
  H1: "bg-blue-500/20 text-blue-400",
  H2: "bg-indigo-500/20 text-indigo-400",
  H3_미적: "bg-violet-500/20 text-violet-400",
  H3_확통: "bg-purple-500/20 text-purple-400",
  H3_기하: "bg-pink-500/20 text-pink-400",
  H4: "bg-orange-500/20 text-orange-400",
  H5: "bg-red-500/20 text-red-400",
  I1: "bg-teal-500/20 text-teal-400",
  I2: "bg-cyan-500/20 text-cyan-400",
  I3: "bg-emerald-500/20 text-emerald-400",
  통계특강: "bg-yellow-500/20 text-yellow-400",
};

type FlatRow = Student & CourseEnrollment & { rowKey: string; no: number };

export default function TeacherStudentsPage() {
  const params = useParams();
  const teacherId = params.teacherId as string;

  const [searchNumber, setSearchNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [activeTab, setActiveTab] = useState("전체");

  const teacherCourseCodes = mockCourses
    .filter((c) => c.teacherId === teacherId)
    .map((c) => c.code);

  // flatten students × courses for this teacher
  const flatRows: FlatRow[] = [];
  let no = 1;
  mockStudents.forEach((student) => {
    student.courses.forEach((enrollment) => {
      if (teacherCourseCodes.includes(enrollment.courseCode)) {
        flatRows.push({
          ...student,
          ...enrollment,
          rowKey: `${student.id}-${enrollment.courseCode}`,
          no: no++,
        });
      }
    });
  });

  const courseOptions = [
    { value: "", label: "전체 강의" },
    ...teacherCourseCodes.map((code) => ({ value: code, label: code })),
  ];

  const statusOptions = [
    { value: "", label: "전체 상태" },
    { value: "진행중", label: "진행중" },
    { value: "완료", label: "완료" },
    { value: "일시정지", label: "일시정지" },
    { value: "퇴출", label: "퇴출" },
  ];

  const filtered = flatRows.filter((row) => {
    if (searchNumber && !row.studentNumber.includes(searchNumber)) return false;
    if (searchName && !row.name.includes(searchName)) return false;
    if (selectedCourse && row.courseCode !== selectedCourse) return false;
    if (selectedStatus && row.status !== selectedStatus) return false;
    if (activeTab !== "전체" && row.courseCode !== activeTab) return false;
    return true;
  });

  const columns: Column<FlatRow>[] = [
    { key: "no", label: "NO", render: (item) => <span className="text-admin-text-muted">{item.no}</span> },
    {
      key: "status",
      label: "상태",
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "name",
      label: "이름",
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <span>{item.name}</span>
          <MagnifyingGlass size={13} weight="light" className="text-admin-text-muted cursor-pointer hover:text-admin-accent" />
        </div>
      ),
    },
    { key: "phone", label: "연락처" },
    { key: "age", label: "나이", render: (item) => `${item.age}세` },
    { key: "mathGrade", label: "등급" },
    {
      key: "selectedSubjects",
      label: "선택과목",
      render: (item) => item.selectedSubjects.join(", ") || "-",
    },
    {
      key: "courseCode",
      label: "강의",
      render: (item) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${courseCodeColors[item.courseCode] || "bg-gray-500/20 text-gray-400"}`}>
          {item.courseCode}
        </span>
      ),
    },
    { key: "startDate", label: "시작일" },
    { key: "endDate", label: "종료일" },
    {
      key: "assignmentProgress",
      label: "과제관리",
      render: (item) => (
        <div className="flex items-center gap-2 min-w-[90px]">
          <div className="flex-1 bg-white/10 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-admin-accent"
              style={{ width: `${item.assignmentProgress}%` }}
            />
          </div>
          <span className="text-xs text-admin-text-muted w-8 text-right">{item.assignmentProgress}%</span>
        </div>
      ),
    },
    {
      key: "memo",
      label: "메모",
      render: (item) => (
        <button className="flex items-center gap-1 text-admin-text-muted hover:text-admin-text transition-colors">
          <PencilSimple size={14} weight="light" />
          <span className="text-xs">{item.memo ? "보기" : "작성"}</span>
        </button>
      ),
    },
    {
      key: "lastSubmitDate",
      label: "과제제출일",
      render: (item) => item.lastSubmitDate || "-",
    },
    {
      key: "lastCheckDate",
      label: "최근검사일",
      render: (item) => item.lastCheckDate || "-",
    },
    {
      key: "pause",
      label: "일시정지",
      render: () => (
        <button className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25 transition-colors">
          <Pause size={12} weight="light" />
          정지
        </button>
      ),
    },
    {
      key: "expel",
      label: "퇴출",
      render: () => (
        <button className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors">
          <Prohibit size={12} weight="light" />
          퇴출
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-admin-text">수강 관리</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-admin-card border border-admin-border text-admin-text text-sm hover:bg-white/[0.05] transition-colors">
            <DownloadSimple size={15} weight="light" />
            다운로드
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-admin-card border border-admin-border text-admin-text text-sm hover:bg-white/[0.05] transition-colors">
            미관리 강의 설정
          </button>
        </div>
      </div>

      <FilterBar>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-admin-text-muted">수강번호</span>
          <SearchInput placeholder="수강번호 검색..." value={searchNumber} onChange={setSearchNumber} className="w-36" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-admin-text-muted">이름</span>
          <SearchInput placeholder="이름 검색..." value={searchName} onChange={setSearchName} className="w-36" />
        </div>
        <Dropdown label="강의" options={courseOptions} value={selectedCourse} onChange={setSelectedCourse} className="w-40" />
        <Dropdown label="상태" options={statusOptions} value={selectedStatus} onChange={setSelectedStatus} className="w-32" />
      </FilterBar>

      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {courseTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-admin-accent text-white"
                : "bg-admin-card border border-admin-border text-admin-text-muted hover:text-admin-text"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(item) => item.rowKey}
        emptyMessage="수강 중인 학생이 없습니다."
      />
    </div>
  );
}
