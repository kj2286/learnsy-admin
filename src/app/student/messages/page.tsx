"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";

const MESSAGE_TYPE_STYLES: Record<string, { label: string; className: string }> = {
  nudge: { label: "독려", className: "bg-[#C9E535]/20 text-[#1A1A18]" },
  praise: { label: "칭찬", className: "bg-green-100 text-green-700" },
  warning: { label: "경고", className: "bg-orange-100 text-orange-700" },
  assignment: { label: "과제", className: "bg-[#EBE7DA] text-[#6B6B68]" },
  general: { label: "일반", className: "bg-[#EBE7DA] text-[#6B6B68]" },
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
        <h1 className="text-2xl font-bold text-[#1A1A18]">메시지</h1>
        {unreadCount > 0 && (
          <span className="text-xs bg-[#C9E535] text-[#1A1A18] px-2.5 py-1 rounded-full font-medium">
            읽지 않음 {unreadCount}개
          </span>
        )}
      </div>
      <p className="text-sm text-[#6B6B68] mb-6">
        선생님과 학습매니저가 보낸 메시지입니다
      </p>

      <div className="space-y-2">
        {myMessages.length === 0 ? (
          <div className="bg-white rounded-xl border border-black/10 p-8 text-center">
            <p className="text-sm text-[#6B6B68]">받은 메시지가 없습니다.</p>
          </div>
        ) : (
          myMessages.map((msg) => {
            const style =
              MESSAGE_TYPE_STYLES[msg.type] ?? MESSAGE_TYPE_STYLES.general;
            const isExpanded = expandedId === msg.id;

            return (
              <div
                key={msg.id}
                className={`bg-white rounded-xl border overflow-hidden transition-all cursor-pointer ${
                  !msg.isRead
                    ? "border-[#C9E535]/60"
                    : "border-black/10"
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
                      <p className="text-sm font-medium text-[#1A1A18] truncate">
                        {msg.title}
                      </p>
                      {!msg.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9E535] flex-shrink-0" />
                      )}
                    </div>
                    {!isExpanded && (
                      <p className="text-xs text-[#6B6B68] truncate">
                        {msg.content}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-[#6B6B68] flex-shrink-0 mt-0.5">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="bg-[#F5F2EA] rounded-lg p-3 ml-10">
                      <p className="text-sm text-[#1A1A18] leading-relaxed">
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
