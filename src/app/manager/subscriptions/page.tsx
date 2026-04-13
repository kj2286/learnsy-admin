"use client";

import {
  mockSubscriptions,
  getPlatformStudentById,
  getPlatformTeacherById,
  type Subscription,
} from "@/data/mock-platform";
import { Users, XCircle, WarningCircle } from "@phosphor-icons/react";

// Add 2 extra entries with cancelled/expired status for demo
const extendedSubscriptions: Subscription[] = [
  ...mockSubscriptions,
  { id: "sub10", studentId: "st5", teacherId: "t3", startDate: "2025-09-01", status: "cancelled", monthlyFee: 500000 },
  { id: "sub11", studentId: "st7", teacherId: "t3", startDate: "2025-11-01", status: "expired", monthlyFee: 500000 },
];

function calcMonths(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date("2026-04-13");
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  return Math.max(1, months);
}

const statusConfig = {
  active: { label: "활성", color: "text-green-400", bg: "bg-green-400/15" },
  cancelled: { label: "취소", color: "text-red-400", bg: "bg-red-400/15" },
  expired: { label: "만료", color: "text-[#9ca3af]", bg: "bg-[#9ca3af]/15" },
};

export default function SubscriptionsPage() {
  const activeCount = extendedSubscriptions.filter((s) => s.status === "active").length;
  const cancelCount = extendedSubscriptions.filter((s) => s.status === "cancelled").length;
  const expiredCount = extendedSubscriptions.filter((s) => s.status === "expired").length;

  const summaryCards = [
    { label: "활성 구독", count: activeCount, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20", Icon: Users },
    { label: "취소 예정", count: cancelCount, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20", Icon: XCircle },
    { label: "구독 실패", count: expiredCount, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20", Icon: WarningCircle },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">구독 현황</h1>
        <p className="text-sm text-[#9ca3af] mt-1">학생 구독 상태를 확인합니다</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        {summaryCards.map(({ label, count, color, bg, border, Icon }) => (
          <div key={label} className={`${bg} border ${border} rounded-xl px-5 py-4 flex items-center gap-4`}>
            <div className={`w-10 h-10 rounded-lg ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
              <Icon size={18} weight="light" className={color} />
            </div>
            <div>
              <p className="text-xs text-[#9ca3af]">{label}</p>
              <p className={`text-2xl font-bold ${color} mt-0.5`}>{count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2a2d3e]">
              {["학생", "강사", "시작일", "월 이용료", "상태", "기간"].map((col) => (
                <th key={col} className="px-4 py-3 text-left text-xs font-medium text-[#9ca3af]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {extendedSubscriptions.map((sub) => {
              const student = getPlatformStudentById(sub.studentId);
              const teacher = getPlatformTeacherById(sub.teacherId);
              const cfg = statusConfig[sub.status];
              const months = calcMonths(sub.startDate);

              return (
                <tr key={sub.id} className="border-b border-[#2a2d3e] last:border-0 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm text-white">{student?.name ?? sub.studentId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#9ca3af]">{teacher?.name ?? sub.teacherId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#9ca3af]">{sub.startDate}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#e4e4e7]">
                      ₩{sub.monthlyFee.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#9ca3af]">{months}개월</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
