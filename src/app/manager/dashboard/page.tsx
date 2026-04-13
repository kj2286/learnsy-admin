"use client";

import Link from "next/link";
import {
  ChalkboardTeacher,
  Student,
  EnvelopeSimple,
  ClipboardText,
  Star,
  ChatCircleDots,
} from "@phosphor-icons/react";
import {
  mockManagers,
  mockPlatformTeachers,
  mockPlatformStudents,
  mockSubscriptions,
  mockPlatformMessages,
  mockSchools,
  getSchoolById,
} from "@/data/mock-platform";

const manager = mockManagers[0]; // 홍매니저 (m1)

const assignedTeachers = mockPlatformTeachers.filter((t) =>
  manager.assignedTeachers.includes(t.id)
);

const managedStudentIds = new Set(
  mockSubscriptions
    .filter((sub) => manager.assignedTeachers.includes(sub.teacherId))
    .map((sub) => sub.studentId)
);

const managerMessages = mockPlatformMessages.filter(
  (msg) => msg.fromId === manager.id
);

const pendingAssignments = 3; // mock value

const recentMessages = managerMessages
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 5);

const messageTypeLabel: Record<string, string> = {
  nudge: "독려",
  praise: "칭찬",
  warning: "경고",
  assignment: "과제",
  general: "일반",
};

const messageTypeBadge: Record<string, string> = {
  nudge: "bg-blue-400/10 text-blue-400",
  praise: "bg-green-400/10 text-green-400",
  warning: "bg-red-400/10 text-red-400",
  assignment: "bg-yellow-400/10 text-yellow-400",
  general: "bg-[#2a2d3e] text-[#9ca3af]",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

function getStudentCountForTeacher(teacherId: string) {
  return new Set(
    mockSubscriptions
      .filter((sub) => sub.teacherId === teacherId && sub.status === "active")
      .map((sub) => sub.studentId)
  ).size;
}

export default function ManagerDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-white">
          안녕하세요, {manager.name}님
        </h1>
        <p className="text-sm text-[#9ca3af] mt-1">오늘도 좋은 하루 되세요.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#9ca3af]">담당 강사</span>
            <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center">
              <ChalkboardTeacher size={16} weight="light" className="text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{assignedTeachers.length}</p>
          <p className="text-xs text-[#9ca3af] mt-1">명</p>
        </div>

        <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#9ca3af]">관리 학생 수</span>
            <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center">
              <Student size={16} weight="light" className="text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{managedStudentIds.size}</p>
          <p className="text-xs text-[#9ca3af] mt-1">명</p>
        </div>

        <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#9ca3af]">발송 메시지</span>
            <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center">
              <EnvelopeSimple size={16} weight="light" className="text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{managerMessages.length}</p>
          <p className="text-xs text-[#9ca3af] mt-1">건</p>
        </div>

        <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#9ca3af]">대기 과제</span>
            <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center">
              <ClipboardText size={16} weight="light" className="text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{pendingAssignments}</p>
          <p className="text-xs text-[#9ca3af] mt-1">건</p>
        </div>
      </div>

      {/* Assigned Teachers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">담당 강사</h2>
          <Link
            href="/manager/teachers"
            className="text-xs text-green-400 hover:text-green-300 transition-colors"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {assignedTeachers.map((teacher) => {
            const studentCount = getStudentCountForTeacher(teacher.id);
            const schools = teacher.schools
              .map((sid) => getSchoolById(sid)?.name ?? sid)
              .join(", ");
            return (
              <div
                key={teacher.id}
                className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-400/10 flex items-center justify-center">
                      <ChalkboardTeacher size={18} weight="light" className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{teacher.name}</p>
                      <p className="text-xs text-[#9ca3af]">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} weight="fill" className="text-yellow-400" />
                    <span className="text-xs text-[#9ca3af]">{teacher.rating}</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-[#9ca3af]">
                  <p>담당 학교: <span className="text-[#e4e4e7]">{schools}</span></p>
                  <p>활성 학생: <span className="text-green-400 font-medium">{studentCount}명</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Messages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">최근 발송 메시지</h2>
          <Link
            href="/manager/messages"
            className="text-xs text-green-400 hover:text-green-300 transition-colors"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl overflow-hidden">
          {recentMessages.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#9ca3af]">발송된 메시지가 없습니다.</div>
          ) : (
            <div className="divide-y divide-[#2a2d3e]">
              {recentMessages.map((msg) => {
                const student = mockPlatformStudents.find((s) => s.id === msg.toStudentId);
                return (
                  <div key={msg.id} className="flex items-start gap-3 px-5 py-4">
                    <div className="w-8 h-8 rounded-full bg-[#2a2d3e] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChatCircleDots size={14} weight="light" className="text-[#9ca3af]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-medium text-white truncate">{msg.title}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ${messageTypeBadge[msg.type]}`}>
                          {messageTypeLabel[msg.type]}
                        </span>
                      </div>
                      <p className="text-xs text-[#9ca3af]">
                        → {student?.name ?? msg.toStudentId}
                      </p>
                    </div>
                    <span className="text-[10px] text-[#9ca3af] flex-shrink-0">{formatDate(msg.createdAt)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
