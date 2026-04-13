"use client";

import { useState } from "react";
import { PaperPlaneRight, User } from "@phosphor-icons/react";
import { mockManagers, mockPlatformTeachers, mockPlatformStudents, mockPlatformMessages, getPlatformTeacherById, getPlatformStudentById } from "@/data/mock-platform";
import Dropdown from "@/components/shared/Dropdown";

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

  const assignedTeachers = manager.assignedTeachers.map((tid) => getPlatformTeacherById(tid)).filter(Boolean);
  const assignedStudentIds = new Set(
    mockPlatformStudents
      .filter((s) => s.subscriptions.some((tid) => manager.assignedTeachers.includes(tid)))
      .map((s) => s.id)
  );
  const messages = mockPlatformMessages
    .filter((m) => m.fromId === manager.id || (m.fromRole === "manager" && manager.assignedTeachers.includes(m.teacherId)))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">학습매니저</h1>
          <p className="text-sm text-admin-text-muted mt-1">학습매니저 활동 현황 및 메시지 관리</p>
        </div>
        <Dropdown
          value={selectedManager}
          onChange={setSelectedManager}
          options={mockManagers.map((m) => ({ value: m.id, label: m.name }))}
          className="w-40"
        />
      </div>

      {/* 매니저 요약 카드 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-admin-card border border-admin-border">
          <p className="text-xs text-admin-text-muted">담당 강사</p>
          <p className="text-2xl font-bold mt-1">{assignedTeachers.length}명</p>
          <div className="flex gap-1 mt-2">
            {assignedTeachers.map((t) => (
              <span key={t!.id} className="text-xs bg-admin-accent/10 text-admin-accent px-2 py-0.5 rounded">{t!.name}</span>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-lg bg-admin-card border border-admin-border">
          <p className="text-xs text-admin-text-muted">담당 학생</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{assignedStudentIds.size}명</p>
        </div>
        <div className="p-4 rounded-lg bg-admin-card border border-admin-border">
          <p className="text-xs text-admin-text-muted">발송 메시지</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{messages.length}건</p>
        </div>
      </div>

      {/* 메시지 히스토리 */}
      <div className="rounded-lg bg-admin-card border border-admin-border">
        <div className="px-4 py-3 border-b border-admin-border flex items-center justify-between">
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
              <div key={msg.id} className="px-4 py-3 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${typeBadgeStyles[msg.type]}`}>
                    {typeLabels[msg.type]}
                  </span>
                  <span className="text-sm font-medium">{msg.title}</span>
                  <span className="ml-auto text-xs text-admin-text-muted">
                    {msg.createdAt.replace("T", " ").slice(0, 16)}
                  </span>
                </div>
                <p className="text-xs text-admin-text-muted truncate">{msg.content}</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-admin-text-muted">
                  <User size={10} weight="light" />
                  <span>{student?.name || "알 수 없음"}</span>
                  <span>&middot;</span>
                  <span>{getPlatformTeacherById(msg.teacherId)?.name} 명의</span>
                  {!msg.isRead && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-blue-400" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
