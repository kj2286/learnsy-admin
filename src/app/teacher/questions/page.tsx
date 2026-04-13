"use client";

import { useState } from "react";
import { User, Clock } from "@phosphor-icons/react";
import { mockQuestions } from "@/data/mock-questions";
import Dropdown from "@/components/shared/Dropdown";
import type { Question } from "@/types";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState(mockQuestions);
  const [courseFilter, setCourseFilter] = useState("all");

  const filtered = courseFilter === "all"
    ? questions
    : questions.filter((q) => q.courseCode === courseFilter);

  const waiting = filtered.filter((q) => q.status === "대기");
  const completed = filtered.filter((q) => q.status === "완료");

  const toggleStatus = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, status: q.status === "대기" ? "완료" as const : "대기" as const, answer: q.status === "대기" ? "답변이 등록되었습니다." : undefined }
          : q
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-4">질문 관리</h1>

      <div className="flex gap-3 mb-6 p-4 bg-white border border-gray-200 rounded-lg">
        <Dropdown
          label="강의 선택"
          dark={false}
          value={courseFilter}
          onChange={setCourseFilter}
          options={[
            { value: "all", label: "전체" },
            { value: "H3_미적", label: "H3 미적분" },
            { value: "H2", label: "H2" },
            { value: "I2", label: "I2" },
            { value: "I3", label: "I3" },
          ]}
          className="w-48"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 답변 대기 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <h2 className="text-sm font-bold text-gray-700">답변 대기 ({waiting.length})</h2>
          </div>
          <div className="space-y-3">
            {waiting.map((q) => (
              <QuestionCard key={q.id} question={q} onToggle={toggleStatus} />
            ))}
            {waiting.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-8">대기 중인 질문이 없습니다</p>
            )}
          </div>
        </div>

        {/* 답변 완료 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <h2 className="text-sm font-bold text-gray-700">답변 완료 ({completed.length})</h2>
          </div>
          <div className="space-y-3">
            {completed.map((q) => (
              <QuestionCard key={q.id} question={q} onToggle={toggleStatus} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionCard({ question, onToggle }: { question: Question; onToggle: (id: string) => void }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onToggle(question.id)}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
          [{question.courseCode}] {question.courseName}
        </span>
      </div>
      <div className="mb-2">
        <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{question.category}</span>
      </div>
      <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
        <User size={12} weight="light" />
        <span>{question.studentName}</span>
      </div>
      <p className="text-sm text-gray-700 line-clamp-2 mb-2">{question.content}</p>
      {question.answer && (
        <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded text-xs text-green-700">
          <span className="font-semibold">답변:</span> {question.answer}
        </div>
      )}
      <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
        <Clock size={12} weight="light" />
        <span>{question.createdAt}</span>
      </div>
    </div>
  );
}
