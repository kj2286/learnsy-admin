"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  GraduationCap,
  EnvelopeSimple,
  ChatCircleDots,
} from "@phosphor-icons/react";
import {
  mockSubscriptions,
  mockPlatformMessages,
  getPlatformStudentById,
  getPlatformTeacherById,
  getSchoolById,
} from "@/data/mock-platform";

interface PageProps {
  params: Promise<{ studentId: string }>;
}

const statusLabel: Record<string, string> = {
  active: "활성",
  cancelled: "해지",
  expired: "만료",
};

const statusStyle: Record<string, string> = {
  active: "bg-green-400/10 text-green-400",
  cancelled: "bg-red-400/10 text-red-400",
  expired: "bg-[#2a2d3e] text-[#9ca3af]",
};

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

const chapterLabel: Record<string, string> = {
  c1: "1단원",
  c2: "2단원",
  c3: "3단원",
  c4: "4단원",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, "0")}.${d.getDate().toString().padStart(2, "0")}`;
}

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

export default function StudentProfilePage({ params }: PageProps) {
  const { studentId } = use(params);
  const student = getPlatformStudentById(studentId);

  if (!student) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#9ca3af]">학생 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const school = getSchoolById(student.school);
  const subscriptions = mockSubscriptions.filter((sub) => sub.studentId === studentId);
  const messages = mockPlatformMessages
    .filter((msg) => msg.toStudentId === studentId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const progressEntries = Object.entries(student.progress);

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/manager/teachers"
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1c1f2e] border border-[#2a2d3e] text-[#9ca3af] hover:text-white transition-colors"
        >
          <ArrowLeft size={16} weight="light" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-white">
            {student.name} 프로필
          </h1>
          <p className="text-sm text-[#9ca3af] mt-0.5">{school?.name ?? "-"} · {student.grade}학년</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl p-6">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-full bg-green-400/10 flex items-center justify-center flex-shrink-0">
            <User size={24} weight="light" className="text-green-400" />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-3">
            <div>
              <p className="text-xs text-[#9ca3af] mb-0.5">이름</p>
              <p className="text-sm text-white font-medium">{student.name}</p>
            </div>
            <div>
              <p className="text-xs text-[#9ca3af] mb-0.5">성별</p>
              <p className="text-sm text-white">{student.gender}</p>
            </div>
            <div>
              <p className="text-xs text-[#9ca3af] mb-0.5">학교</p>
              <div className="flex items-center gap-1.5">
                <GraduationCap size={13} weight="light" className="text-[#9ca3af]" />
                <p className="text-sm text-white">{school?.name ?? "-"}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#9ca3af] mb-0.5">학년 / 계열</p>
              <p className="text-sm text-white">{student.grade}학년 · {student.track}</p>
            </div>
            <div>
              <p className="text-xs text-[#9ca3af] mb-0.5">연락처</p>
              <div className="flex items-center gap-1.5">
                <Phone size={13} weight="light" className="text-[#9ca3af]" />
                <p className="text-sm text-white">{student.phone || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscriptions */}
      <div>
        <h2 className="text-sm font-semibold text-white mb-3">구독 현황</h2>
        <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl overflow-hidden">
          {subscriptions.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#9ca3af]">구독 내역이 없습니다.</div>
          ) : (
            <div className="divide-y divide-[#2a2d3e]">
              {subscriptions.map((sub) => {
                const teacher = getPlatformTeacherById(sub.teacherId);
                return (
                  <div key={sub.id} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2a2d3e] flex items-center justify-center">
                        <GraduationCap size={14} weight="light" className="text-[#9ca3af]" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{teacher?.name ?? sub.teacherId}</p>
                        <p className="text-xs text-[#9ca3af]">{teacher?.subject ?? "-"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#9ca3af]">
                      <span>시작: {formatDate(sub.startDate)}</span>
                      <span className="text-[#e4e4e7]">
                        {sub.monthlyFee.toLocaleString()}원/월
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${statusStyle[sub.status]}`}>
                        {statusLabel[sub.status]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Progress */}
      {progressEntries.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-white mb-3">학습 진행률</h2>
          <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl p-5 space-y-4">
            {progressEntries.map(([chapterId, pct]) => (
              <div key={chapterId}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#9ca3af]">
                    {chapterLabel[chapterId] ?? chapterId}
                  </span>
                  <span className="text-xs text-[#e4e4e7] font-medium">{pct}%</span>
                </div>
                <div className="h-2 bg-[#2a2d3e] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Messages */}
      <div>
        <h2 className="text-sm font-semibold text-white mb-3">최근 메시지</h2>
        <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl overflow-hidden">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#9ca3af]">메시지 내역이 없습니다.</div>
          ) : (
            <div className="divide-y divide-[#2a2d3e]">
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3 px-5 py-4">
                  <div className="w-8 h-8 rounded-full bg-[#2a2d3e] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ChatCircleDots size={14} weight="light" className="text-[#9ca3af]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-white truncate">{msg.title}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ${messageTypeBadge[msg.type]}`}>
                        {messageTypeLabel[msg.type]}
                      </span>
                      {!msg.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-[#9ca3af] leading-relaxed line-clamp-2">{msg.content}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] text-[#4b5563]">
                        발신: {msg.fromRole === "manager" ? "매니저" : "선생님"}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#9ca3af] flex-shrink-0">{formatDateTime(msg.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
