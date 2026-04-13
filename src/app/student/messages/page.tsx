"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";

const MESSAGE_TYPE_STYLES: Record<string, { label: string; className: string }> = {
  nudge: { label: "독려", className: "bg-blue-50 text-blue-600" },
  praise: { label: "칭찬", className: "bg-green-50 text-green-600" },
  warning: { label: "경고", className: "bg-orange-50 text-orange-600" },
  assignment: { label: "과제", className: "bg-purple-50 text-purple-600" },
  general: { label: "일반", className: "bg-gray-100 text-gray-600" },
};

export default function StudentMessagesPage() {
  const { platformMessages } = useData();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const myMessages = platformMessages.filter((m) => m.toStudentId === "st1");
  const unreadCount = myMessages.filter((m) => !m.isRead).length;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1}월 ${d.getDate()}일 ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-bold text-gray-900">메시지</h1>
        {unreadCount > 0 && (
          <span className="text-xs bg-blue-500 text-white px-2.5 py-1 rounded-full font-medium">
            읽지 않음 {unreadCount}개
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-6">
        선생님과 학습매니저가 보낸 메시지입니다
      </p>

      <div className="space-y-2">
        {myMessages.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-sm text-gray-400">받은 메시지가 없습니다.</p>
          </div>
        ) : (
          myMessages.map((msg) => {
            const style =
              MESSAGE_TYPE_STYLES[msg.type] ?? MESSAGE_TYPE_STYLES.general;
            const isExpanded = expandedId === msg.id;

            return (
              <div
                key={msg.id}
                className={`bg-white border rounded-xl overflow-hidden transition-all cursor-pointer ${
                  !msg.isRead
                    ? "border-blue-200"
                    : "border-gray-200"
                }`}
                onClick={() => toggleExpand(msg.id)}
              >
                <div className="flex items-start gap-3 p-4">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium flex-shrink-0 mt-0.5 ${style.className}`}
                  >
                    {style.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {msg.title}
                      </p>
                      {!msg.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    {!isExpanded && (
                      <p className="text-xs text-gray-500 truncate">
                        {msg.content}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="bg-gray-50 rounded-lg p-3 ml-10">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
