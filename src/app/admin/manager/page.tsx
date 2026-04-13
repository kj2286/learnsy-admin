"use client";

import { useState } from "react";
import { PaperPlaneRight, User, ChalkboardTeacher, Users, Star, MapPin, Buildings, EnvelopeSimple } from "@phosphor-icons/react";
import { mockManagers, mockPlatformTeachers, mockPlatformStudents, mockPlatformMessages, mockSubscriptions, mockSchools, getPlatformTeacherById, getPlatformStudentById, getSchoolById } from "@/data/mock-platform";
import Dropdown from "@/components/shared/Dropdown";
import Link from "next/link";

const typeBadgeStyles: Record<string, string> = {
  nudge: "bg-blue-400/10 text-blue-400",
  praise: "bg-green-400/10 text-green-400",
  warning: "bg-orange-400/10 text-orange-400",
  assignment: "bg-purple-400/10 text-purple-400",
  general: "bg-gray-400/10 text-gray-400",
};
const typeLabels: Record<string, string> = {
  nudge: "독려", praise: "칭찬", warning: "경고", assignment: "과제", general: "일반",
};

export default function ManagerPage() {
  const [selectedManager, setSelectedManager] = useState(mockManagers[0].id);
  const manager = mockManagers.find((m) => m.id === selectedManager)!;

  const assignedTeachers = manager.assignedTeachers
    .map((tid) => getPlatformTeacherById(tid))
    .filter(Boolean)
    .map((teacher) => {
      const schools = teacher!.schools.map((sid) => getSchoolById(sid)).filter(Boolean);
      const studentCount = mockSubscriptions.filter(
        (s) => s.teacherId === teacher!.id && s.status === "active"
      ).length;
      return { ...teacher!, schoolNames: schools.map((s) => s!.name), studentCount };
    });

  const totalStudents = assignedTeachers.reduce((sum, t) => sum + t.studentCount, 0);

  const messages = mockPlatformMessages
    .filter((m) => m.fromId === manager.id || (m.fromRole === "manager" && manager.assignedTeachers.includes(m.teacherId)))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">학습매니저</h1>
          <p className="text-sm text-admin-text-muted mt-1">학습매니저별 담당 강사 및 활동 현황</p>
        </div>
        <Dropdown
          value={selectedManager}
          onChange={setSelectedManager}
          options={mockManagers.map((m) => ({ value: m.id, label: m.name }))}
          className="w-40"
        />
      </div>

      {/* 매니저 요약 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-admin-card border border-admin-border">
          <div className="flex items-center gap-2 mb-2">
            <ChalkboardTeacher size={16} weight="light" className="text-admin-accent" />
            <p className="text-xs text-admin-text-muted">담당 강사</p>
          </div>
          <p className="text-2xl font-bold">{assignedTeachers.length}명</p>
        </div>
        <div className="p-4 rounded-xl bg-admin-card border border-admin-border">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} weight="light" className="text-green-400" />
            <p className="text-xs text-admin-text-muted">총 관리 학생</p>
          </div>
          <p className="text-2xl font-bold text-green-400">{totalStudents}명</p>
        </div>
        <div className="p-4 rounded-xl bg-admin-card border border-admin-border">
          <div className="flex items-center gap-2 mb-2">
            <EnvelopeSimple size={16} weight="light" className="text-blue-400" />
            <p className="text-xs text-admin-text-muted">발송 메시지</p>
          </div>
          <p className="text-2xl font-bold text-blue-400">{messages.length}건</p>
        </div>
        <div className="p-4 rounded-xl bg-admin-card border border-admin-border">
          <div className="flex items-center gap-2 mb-2">
            <EnvelopeSimple size={16} weight="light" className="text-orange-400" />
            <p className="text-xs text-admin-text-muted">안읽은 메시지</p>
          </div>
          <p className="text-2xl font-bold text-orange-400">{messages.filter((m) => !m.isRead).length}건</p>
        </div>
      </div>

      {/* 담당 강사 목록 */}
      <div className="rounded-xl bg-admin-card border border-admin-border mb-6">
        <div className="px-5 py-3 border-b border-admin-border">
          <h2 className="text-sm font-bold">담당 강사 ({assignedTeachers.length}명)</h2>
        </div>
        <div className="divide-y divide-admin-border">
          {assignedTeachers.map((teacher) => (
            <div key={teacher.id} className="px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-admin-accent/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-admin-accent">{teacher.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-admin-text">{teacher.name}</span>
                  <span className="text-xs bg-admin-border px-2 py-0.5 rounded text-admin-text-muted">{teacher.subject}</span>
                  <div className="flex items-center gap-0.5">
                    <Star size={11} weight="fill" className="text-yellow-400" />
                    <span className="text-[11px] text-admin-text-muted">{teacher.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-admin-text-muted">
                  <span className="flex items-center gap-1">
                    <Buildings size={11} weight="light" />
                    {teacher.schoolNames.join(", ")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={11} weight="light" />
                    학생 {teacher.studentCount}명
                  </span>
                </div>
              </div>
              <Link
                href={`/admin/teacher-management`}
                className="text-xs px-3 py-1.5 rounded-lg border border-admin-border text-admin-text-muted hover:text-admin-accent hover:border-admin-accent/50 transition-colors"
              >
                상세보기
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 메시지 히스토리 */}
      <div className="rounded-xl bg-admin-card border border-admin-border">
        <div className="px-5 py-3 border-b border-admin-border flex items-center justify-between">
          <h2 className="text-sm font-bold">발송 메시지 내역</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-admin-accent text-white rounded-lg text-xs font-medium hover:bg-admin-accent-hover transition-colors">
            <PaperPlaneRight size={14} weight="light" />
            메시지 작성
          </button>
        </div>
        <div className="divide-y divide-admin-border">
          {messages.map((msg) => {
            const student = getPlatformStudentById(msg.toStudentId);
            return (
              <div key={msg.id} className="px-5 py-3 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${typeBadgeStyles[msg.type]}`}>
                    {typeLabels[msg.type]}
                  </span>
                  <span className="text-sm font-medium">{msg.title}</span>
                  {!msg.isRead && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  <span className="ml-auto text-xs text-admin-text-muted">
                    {msg.createdAt.replace("T", " ").slice(0, 16)}
                  </span>
                </div>
                <p className="text-xs text-admin-text-muted truncate">{msg.content}</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-admin-text-muted">
                  <User size={10} weight="light" />
                  <span>{student?.name || "알 수 없음"}</span>
                  <span>·</span>
                  <span>{getPlatformTeacherById(msg.teacherId)?.name} 명의</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
