"use client";

import { Plus } from "@phosphor-icons/react";
import { mockSchools, mockPlatformTeachers, mockPlatformStudents, mockLectures } from "@/data/mock-platform";
import DataTable, { type Column } from "@/components/admin/DataTable";
import type { School } from "@/data/mock-platform";

export default function SchoolsPage() {
  const schoolsWithStats = mockSchools.map((school) => {
    const teachers = mockPlatformTeachers.filter((t) => t.schools.includes(school.id));
    const students = mockPlatformStudents.filter((s) => s.school === school.id);
    const lectures = mockLectures.filter((l) => l.schoolId === school.id);
    return { ...school, teacherCount: teachers.length, studentCount: students.length, lectureCount: lectures.length };
  });

  type SchoolWithStats = School & { teacherCount: number; studentCount: number; lectureCount: number };

  const columns: Column<SchoolWithStats>[] = [
    { key: "name", label: "학교명", render: (item) => <span className="font-medium">{item.name}</span> },
    { key: "region", label: "지역" },
    { key: "teacherCount", label: "담당 강사", render: (item) => `${item.teacherCount}명` },
    { key: "studentCount", label: "수강생", render: (item) => `${item.studentCount}명` },
    { key: "lectureCount", label: "강의 수", render: (item) => `${item.lectureCount}개` },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">학교 관리</h1>
          <p className="text-sm text-admin-text-muted mt-1">내신인강 대상 학교를 관리합니다</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-admin-accent text-white rounded-lg text-sm font-medium hover:bg-admin-accent-hover transition-colors">
          <Plus size={16} weight="bold" />
          학교 추가
        </button>
      </div>

      <DataTable columns={columns} data={schoolsWithStats} keyExtractor={(item) => item.id} />
    </div>
  );
}
