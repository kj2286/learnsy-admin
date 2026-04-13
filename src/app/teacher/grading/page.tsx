"use client";

import { useState } from "react";
import { CheckCircle, XCircle, CaretDown, CaretUp, PaperPlaneTilt } from "@phosphor-icons/react";

interface GradingItem {
  id: string;
  studentName: string;
  chapterTitle: string;
  problemText: string;
  aiGrading: { isCorrect: boolean; feedback: string };
  teacherFeedback: string;
  status: "pending" | "sent";
}

const initialItems: GradingItem[] = [
  {
    id: "g1",
    studentName: "이하은",
    chapterTitle: "2강 — 미분계수와 도함수",
    problemText: "f(x) = x³ - 3x² + 2x 일 때, x = 1에서의 미분계수를 구하시오.",
    aiGrading: { isCorrect: false, feedback: "극한의 정의를 이용한 풀이는 맞으나, 최종 계산에서 부호 오류가 발생했습니다. f'(1) = 3(1)² - 6(1) + 2 = -1 이 정답입니다." },
    teacherFeedback: "",
    status: "pending",
  },
  {
    id: "g2",
    studentName: "김민수",
    chapterTitle: "3강 — 접선의 방정식",
    problemText: "곡선 y = x² + x 위의 점 (1, 2)에서의 접선의 방정식을 구하시오.",
    aiGrading: { isCorrect: true, feedback: "도함수 y' = 2x + 1을 이용해 기울기 3을 올바르게 구했습니다. 접선의 방정식 y = 3x - 1도 정확합니다." },
    teacherFeedback: "",
    status: "pending",
  },
  {
    id: "g3",
    studentName: "박서연",
    chapterTitle: "1강 — 함수의 극한",
    problemText: "lim(x→2) (x² - 4) / (x - 2) 의 값을 구하시오.",
    aiGrading: { isCorrect: true, feedback: "인수분해를 통해 극한값 4를 정확히 구했습니다. 풀이 과정도 명확합니다." },
    teacherFeedback: "",
    status: "pending",
  },
  {
    id: "g4",
    studentName: "강도윤",
    chapterTitle: "4강 — 극값과 최대·최솟값",
    problemText: "f(x) = x³ - 6x² + 9x + 1 의 극값을 모두 구하시오.",
    aiGrading: { isCorrect: false, feedback: "f'(x) = 3x² - 12x + 9 = 3(x-1)(x-3) 으로 인수분해가 맞으나, 극대·극소 판단에서 오류가 있습니다. x=1이 극대(f=5), x=3이 극소(f=1)입니다." },
    teacherFeedback: "",
    status: "pending",
  },
  {
    id: "g5",
    studentName: "이하은",
    chapterTitle: "1강 — 함수의 극한",
    problemText: "lim(x→0) sin(3x) / x 의 값을 구하시오.",
    aiGrading: { isCorrect: true, feedback: "sin(x)/x → 1 공식을 응용하여 lim sin(3x)/x = 3을 정확히 구했습니다." },
    teacherFeedback: "",
    status: "sent",
  },
];

export default function TeacherGradingPage() {
  const [items, setItems] = useState<GradingItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<"pending" | "sent">("pending");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const pendingItems = items.filter((i) => i.status === "pending");
  const sentItems = items.filter((i) => i.status === "sent");
  const displayItems = activeTab === "pending" ? pendingItems : sentItems;

  const updateFeedback = (id: string, value: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, teacherFeedback: value } : i)));
  };

  const sendFeedback = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "sent" } : i)));
    setExpandedId(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-1">채점 관리</h1>
      <p className="text-sm text-gray-500 mb-6">AI 채점 결과를 검토하고 학생에게 피드백을 발송하세요</p>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {(["pending", "sent"] as const).map((tab) => {
          const count = tab === "pending" ? pendingItems.length : sentItems.length;
          const label = tab === "pending" ? "채점 대기" : "발송 완료";
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                activeTab === tab ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-500"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {displayItems.length === 0 && (
          <div className="text-center py-12 text-sm text-gray-400">항목이 없습니다.</div>
        )}
        {displayItems.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Collapsed header */}
              <button
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <div className="flex-shrink-0">
                  {item.aiGrading.isCorrect ? (
                    <CheckCircle size={22} weight="fill" className="text-green-500" />
                  ) : (
                    <XCircle size={22} weight="fill" className="text-red-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-gray-900">{item.studentName}</span>
                    <span className="text-xs text-gray-400">{item.chapterTitle}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{item.problemText}</p>
                </div>
                <div className="flex-shrink-0 text-gray-400">
                  {isExpanded ? <CaretUp size={16} weight="light" /> : <CaretDown size={16} weight="light" />}
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-gray-100 p-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">문제</p>
                    <p className="text-sm text-gray-800">{item.problemText}</p>
                  </div>

                  <div className={`rounded-lg p-3 ${item.aiGrading.isCorrect ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100"}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      {item.aiGrading.isCorrect ? (
                        <CheckCircle size={14} weight="fill" className="text-green-500" />
                      ) : (
                        <XCircle size={14} weight="fill" className="text-red-400" />
                      )}
                      <p className={`text-xs font-semibold ${item.aiGrading.isCorrect ? "text-green-700" : "text-red-600"}`}>
                        AI 분석 — {item.aiGrading.isCorrect ? "정답" : "오답"}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.aiGrading.feedback}</p>
                  </div>

                  {item.status === "pending" && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">선생님 피드백</p>
                      <textarea
                        className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 placeholder-gray-300"
                        rows={3}
                        placeholder="학생에게 추가로 전달할 내용을 입력하세요..."
                        value={item.teacherFeedback}
                        onChange={(e) => updateFeedback(item.id, e.target.value)}
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => sendFeedback(item.id)}
                          className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <PaperPlaneTilt size={15} weight="light" />
                          발송
                        </button>
                      </div>
                    </div>
                  )}

                  {item.status === "sent" && item.teacherFeedback && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">발송된 피드백</p>
                      <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{item.teacherFeedback}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
