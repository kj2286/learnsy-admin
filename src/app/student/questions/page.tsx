"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";

type Tab = "전체" | "대기중" | "답변완료";

export default function StudentQuestionsPage() {
  const { questions } = useData();
  const [activeTab, setActiveTab] = useState<Tab>("전체");

  const filtered = questions.filter((q) => {
    if (activeTab === "대기중") return q.status === "대기";
    if (activeTab === "답변완료") return q.status === "완료";
    return true;
  });

  const counts = {
    전체: questions.length,
    대기중: questions.filter((q) => q.status === "대기").length,
    답변완료: questions.filter((q) => q.status === "완료").length,
  };

  const tabs: Tab[] = ["전체", "대기중", "답변완료"];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-1">질문</h1>
      <p className="text-sm text-gray-500 mb-6">
        강의 관련 질문과 선생님의 답변을 확인하세요
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                activeTab === tab
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Question list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-sm text-gray-400">질문이 없습니다.</p>
          </div>
        ) : (
          filtered.map((q) => (
            <div
              key={q.id}
              className="bg-white border border-gray-200 rounded-xl p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-medium flex-shrink-0 mt-0.5 ${
                    q.status === "완료"
                      ? "bg-green-50 text-green-600"
                      : "bg-orange-50 text-orange-500"
                  }`}
                >
                  {q.status === "완료" ? "답변완료" : "대기중"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400">{q.courseName}</span>
                    <span className="text-gray-200">·</span>
                    <span className="text-xs text-gray-400">{q.chapter}</span>
                  </div>
                  <p className="text-sm text-gray-900">{q.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{q.createdAt}</p>
                </div>
              </div>

              {q.status === "완료" && q.answer && (
                <div className="ml-8 bg-green-50 border border-green-100 rounded-lg p-3">
                  <p className="text-xs font-medium text-green-700 mb-1">
                    선생님 답변
                  </p>
                  <p className="text-xs text-green-800 leading-relaxed">
                    {q.answer}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
