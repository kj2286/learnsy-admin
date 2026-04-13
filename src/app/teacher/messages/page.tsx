"use client";

import { useData } from "@/context/DataContext";
import { PaperPlaneTilt, CheckCircle, Circle } from "@phosphor-icons/react";

const typeConfig: Record<string, { label: string; className: string }> = {
  nudge:      { label: "독려",   className: "bg-blue-50 text-blue-600" },
  praise:     { label: "칭찬",   className: "bg-green-50 text-green-600" },
  warning:    { label: "경고",   className: "bg-orange-50 text-orange-600" },
  assignment: { label: "과제",   className: "bg-purple-50 text-purple-600" },
  general:    { label: "일반",   className: "bg-gray-100 text-gray-500" },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours().toString().padStart(2, "0");
  const min = d.getMinutes().toString().padStart(2, "0");
  return `${month}월 ${day}일 ${hour}:${min}`;
}

export default function TeacherMessagesPage() {
  const { platformMessages, students } = useData();

  const myMessages = platformMessages.filter((m) => m.teacherId === "t1");

  const getStudentName = (id: string) => students.find((s) => s.id === id)?.name ?? id;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">메시지 발송</h1>
          <p className="text-sm text-gray-500">학생에게 발송된 메시지 {myMessages.length}건</p>
        </div>
        <button className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <PaperPlaneTilt size={15} weight="light" />
          메시지 작성
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {myMessages.length === 0 ? (
          <div className="text-center py-12 text-sm text-gray-400">발송된 메시지가 없습니다.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {myMessages.map((msg) => {
              const type = typeConfig[msg.type] ?? typeConfig.general;
              return (
                <div key={msg.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 pt-0.5">
                    {msg.isRead ? (
                      <CheckCircle size={18} weight="fill" className="text-gray-300" />
                    ) : (
                      <Circle size={18} weight="fill" className="text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${type.className}`}>
                        {type.label}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 truncate">{msg.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">받는 사람: {getStudentName(msg.toStudentId)}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{formatDate(msg.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`text-xs ${msg.isRead ? "text-gray-400" : "text-blue-500 font-medium"}`}>
                      {msg.isRead ? "읽음" : "안읽음"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
