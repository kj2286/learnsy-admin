"use client";

import { mockSubscriptions, mockPlatformStudents, mockPlatformTeachers, getPlatformStudentById, getPlatformTeacherById, getSchoolById } from "@/data/mock-platform";
import DataTable, { type Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Subscription } from "@/data/mock-platform";

export default function SubscriptionsPage() {
  const activeCount = mockSubscriptions.filter((s) => s.status === "active").length;
  const totalRevenue = mockSubscriptions.filter((s) => s.status === "active").reduce((sum, s) => sum + s.monthlyFee, 0);

  const columns: Column<Subscription>[] = [
    { key: "studentId", label: "학생", render: (item) => {
      const st = getPlatformStudentById(item.studentId);
      return st ? (
        <div>
          <p className="font-medium">{st.name}</p>
          <p className="text-xs text-admin-text-muted">{getSchoolById(st.school)?.name} {st.grade}학년</p>
        </div>
      ) : "-";
    }},
    { key: "teacherId", label: "강사", render: (item) => getPlatformTeacherById(item.teacherId)?.name || "-" },
    { key: "startDate", label: "구독 시작일" },
    { key: "monthlyFee", label: "월 구독료", render: (item) => `₩${item.monthlyFee.toLocaleString()}` },
    { key: "status", label: "상태", render: (item) => {
      const map: Record<string, string> = { active: "활성", cancelled: "취소", expired: "만료" };
      return <StatusBadge status={map[item.status] || item.status} />;
    }},
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold">구독 관리</h1>
        <p className="text-sm text-admin-text-muted mt-1">학생-강사 구독 현황을 관리합니다</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-admin-card border border-admin-border">
          <p className="text-xs text-admin-text-muted">전체 구독</p>
          <p className="text-2xl font-bold mt-1">{mockSubscriptions.length}건</p>
        </div>
        <div className="p-4 rounded-lg bg-admin-card border border-admin-border">
          <p className="text-xs text-admin-text-muted">활성 구독</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{activeCount}건</p>
        </div>
        <div className="p-4 rounded-lg bg-admin-card border border-admin-border">
          <p className="text-xs text-admin-text-muted">월 구독 매출</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">₩{totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <DataTable columns={columns} data={mockSubscriptions} keyExtractor={(item) => item.id} />
    </div>
  );
}
