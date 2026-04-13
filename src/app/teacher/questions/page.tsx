"use client";

import { useState } from "react";
import { User, Clock, PaperPlaneTilt } from "@phosphor-icons/react";
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
    <div>
      <h1 className="text-xl font-bold text-[#1A1A18] mb-1">질문 관리</h1>
      <p className="text-sm text-[#6B6B68] mb-6">AI 초안을 검토하고 학생에게 답변을 발송하세요</p>

      <div className="flex gap-3 mb-6 p-4 bg-white border border-black/10 rounded-xl">
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
            <div className="w-2.5 h-2.5 rounded-full bg-[#C9E535]"></div>
            <h2 className="text-sm font-bold text-[#1A1A18]">답변 대기 ({waiting.length})</h2>
          </div>
          <div className="space-y-3">
            {waiting.map((q) => (
              <QuestionCard key={q.id} question={q} onToggle={toggleStatus} />
            ))}
            {waiting.length === 0 && (
              <p className="text-center text-[#6B6B68] text-sm py-8">대기 중인 질문이 없습니다</p>
            )}
          </div>
        </div>

        {/* 답변 완료 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#6B6B68]/40"></div>
            <h2 className="text-sm font-bold text-[#1A1A18]">답변 완료 ({completed.length})</h2>
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
  const [draft, setDraft] = useState(question.answer ?? "");

  return (
    <div className="bg-white border border-black/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-[#6B6B68] bg-[#EBE7DA] px-2 py-0.5 rounded">
          [{question.courseCode}] {question.courseName}
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
          question.status === "대기"
            ? "bg-[#EBE7DA] text-[#6B6B68]"
            : "bg-[#C9E535]/20 text-[#1A1A18]"
        }`}>
          {question.status === "대기" ? "검토대기" : "발송완료"}
        </span>
      </div>

      <div className="mb-2">
        <span className="text-xs text-[#6B6B68] bg-[#EBE7DA] px-2 py-0.5 rounded">{question.category}</span>
      </div>

      <div className="flex items-center gap-1 mb-2 text-xs text-[#6B6B68]">
        <User size={12} weight="light" />
        <span>{question.studentName}</span>
      </div>

      {/* Student question bubble */}
      <div className="bg-[#C9E535]/30 rounded-xl rounded-tl-none px-3 py-2 mb-3">
        <p className="text-sm text-[#1A1A18]">{question.content}</p>
      </div>

      {/* AI draft */}
      {question.status === "대기" && (
        <div className="bg-[#EBE7DA] rounded-xl p-3 mb-3">
          <p className="text-[10px] font-semibold text-[#6B6B68] mb-1">AI 초안</p>
          <p className="text-xs text-[#1A1A18] leading-relaxed">AI가 작성한 답변 초안입니다. 검토 후 수정하여 발송하세요.</p>
        </div>
      )}

      {question.status === "대기" ? (
        <div>
          <textarea
            className="w-full text-sm border border-black/10 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#C9E535]/50 bg-white text-[#1A1A18] placeholder-[#6B6B68]/50"
            rows={3}
            placeholder="답변을 입력하세요..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={() => onToggle(question.id)}
              className="flex items-center gap-1.5 bg-[#C9E535] hover:bg-[#B3CC20] text-[#1A1A18] text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <PaperPlaneTilt size={14} weight="light" />
              발송
            </button>
          </div>
        </div>
      ) : (
        question.answer && (
          <div className="mt-2 p-2 bg-[#C9E535]/10 border border-[#C9E535]/30 rounded text-xs text-[#1A1A18]">
            <span className="font-semibold">답변:</span> {question.answer}
          </div>
        )
      )}

      <div className="flex items-center gap-1 mt-2 text-xs text-[#6B6B68]">
        <Clock size={12} weight="light" />
        <span>{question.createdAt}</span>
      </div>
    </div>
  );
}
