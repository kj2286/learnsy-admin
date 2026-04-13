"use client";

import { useParams } from "next/navigation";
import { Plus } from "@phosphor-icons/react";
import { mockCourses } from "@/data/mock-courses";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Course } from "@/types";

export default function TeacherCoursesPage() {
  const params = useParams();
  const teacherId = params.teacherId as string;

  const courses = mockCourses.filter((c) => c.teacherId === teacherId);

  const columns: Column<Course>[] = [
    { key: "code", label: "코드" },
    { key: "name", label: "강의명" },
    {
      key: "price",
      label: "가격",
      render: (item) => `₩${item.price.toLocaleString()}`,
    },
    {
      key: "status",
      label: "상태",
      render: (item) => <StatusBadge status={item.status} />,
    },
    { key: "createdAt", label: "등록일" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-admin-text">강의 등록</h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-admin-accent text-white text-sm font-medium hover:bg-admin-accent/90 transition-colors">
          <Plus size={15} weight="bold" />
          강의 추가하기
        </button>
      </div>

      <DataTable
        columns={columns}
        data={courses}
        keyExtractor={(item) => item.id}
        emptyMessage="등록된 강의가 없습니다."
      />
    </div>
  );
}
