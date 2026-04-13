"use client";

import { mockTeachers } from "@/data/mock-teachers";

export default function AccountPage() {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-xl font-semibold text-admin-text mb-6">내 계정</h1>

      <div className="bg-admin-card border border-admin-border rounded-lg p-6 space-y-5">
        <div>
          <p className="text-xs font-medium text-admin-text-muted mb-1">이름</p>
          <p className="text-sm text-admin-text">관리자</p>
        </div>

        <div className="border-t border-admin-border" />

        <div>
          <p className="text-xs font-medium text-admin-text-muted mb-1">이메일</p>
          <p className="text-sm text-admin-text">admin@learnsy.kr</p>
        </div>

        <div className="border-t border-admin-border" />

        <div>
          <p className="text-xs font-medium text-admin-text-muted mb-2">담당 강사 목록</p>
          <div className="space-y-2">
            {mockTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-admin-bg border border-admin-border"
              >
                <span className="text-sm text-admin-text">{teacher.name}</span>
                <span className="text-xs text-admin-text-muted">{teacher.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
