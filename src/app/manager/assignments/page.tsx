"use client";

import { useState } from "react";
import {
  ClipboardText,
  CheckCircle,
  XCircle,
  DownloadSimple,
  CaretDown,
  CaretUp,
  Lock,
} from "@phosphor-icons/react";

type AssignmentStatus = "pending_upload" | "pending_review" | "sent";

interface Assignment {
  id: string;
  studentName: string;
  teacherName: string;
  chapterTitle: string;
  problemText: string;
  status: AssignmentStatus;
  isCorrect?: boolean;
  aiFeedback?: string;
  teacherFeedback?: string;
}

const mockAssignments: Assignment[] = [
  {
    id: "a1",
    studentName: "이하은",
    teacherName: "김수학",
    chapterTitle: "3강 — 도함수의 활용",
    problemText: "함수 f(x) = x³ - 3x² + 2에서 극값을 구하고, 증가·감소를 분석하시오.",
    status: "sent",
    isCorrect: true,
    aiFeedback: "극값 계산이 정확합니다. f'(x) = 3x² - 6x = 3x(x-2)를 이용해 x=0, x=2에서의 극값을 올바르게 구했습니다. 증가·감소 표도 완벽합니다.",
    teacherFeedback: "잘 풀었어요! 다음 문제도 이 방식으로 접근해보세요.",
  },
  {
    id: "a2",
    studentName: "김민수",
    teacherName: "김수학",
    chapterTitle: "2강 — 미분의 기초",
    problemText: "다음 함수를 미분하시오. g(x) = (2x+1)(x²-3)",
    status: "sent",
    isCorrect: false,
    aiFeedback: "곱의 미분법 적용 오류가 있습니다. (uv)' = u'v + uv' 공식을 다시 확인해보세요. u = 2x+1, v = x²-3으로 놓고 각각 미분한 후 합산해야 합니다.",
    teacherFeedback: "곱의 미분법을 다시 복습해오세요.",
  },
  {
    id: "a3",
    studentName: "박서연",
    teacherName: "김수학",
    chapterTitle: "4강 — 적분의 기본",
    problemText: "∫(3x² - 2x + 1)dx를 계산하시오.",
    status: "pending_review",
    isCorrect: undefined,
    aiFeedback: undefined,
    teacherFeedback: undefined,
  },
  {
    id: "a4",
    studentName: "정현우",
    teacherName: "박미적",
    chapterTitle: "2강 — 치환적분",
    problemText: "∫(2x)(x²+1)⁴ dx를 치환적분을 이용하여 구하시오.",
    status: "sent",
    isCorrect: true,
    aiFeedback: "t = x²+1로 치환한 뒤 dt = 2x dx를 적용하는 방법이 정확합니다. 최종 답 (x²+1)⁵/5 + C도 맞습니다.",
    teacherFeedback: "완벽합니다! 3강도 기대할게요.",
  },
  {
    id: "a5",
    studentName: "강도윤",
    teacherName: "김수학",
    chapterTitle: "4강 — 정적분의 응용",
    problemText: "곡선 y = x²과 직선 y = x+2로 둘러싸인 도형의 넓이를 구하시오.",
    status: "sent",
    isCorrect: true,
    aiFeedback: "교점 x = -1, x = 2를 올바르게 구했고, 정적분 계산 결과 9/2가 정확합니다.",
    teacherFeedback: undefined,
  },
  {
    id: "a6",
    studentName: "임채원",
    teacherName: "박미적",
    chapterTitle: "1강 — 벡터의 기초",
    problemText: "벡터 a = (2, -1, 3), b = (1, 4, -2)의 내적을 구하시오.",
    status: "pending_upload",
    isCorrect: undefined,
    aiFeedback: undefined,
    teacherFeedback: undefined,
  },
  {
    id: "a7",
    studentName: "오태양",
    teacherName: "최확통",
    chapterTitle: "1강 — 확률의 기초",
    problemText: "주사위 두 개를 동시에 던질 때, 합이 7이 될 확률을 구하시오.",
    status: "sent",
    isCorrect: false,
    aiFeedback: "경우의 수 계산에 오류가 있습니다. 합이 7이 되는 경우는 (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)로 6가지이고, 전체 경우는 36가지이므로 확률은 6/36 = 1/6입니다.",
    teacherFeedback: "경우의 수 나열을 빠뜨리지 말고 체계적으로 해보세요.",
  },
  {
    id: "a8",
    studentName: "이하은",
    teacherName: "김수학",
    chapterTitle: "2강 — 미분의 기초",
    problemText: "f(x) = sin(2x)를 미분하시오.",
    status: "pending_review",
    isCorrect: undefined,
    aiFeedback: undefined,
    teacherFeedback: undefined,
  },
];

const statusConfig: Record<AssignmentStatus, { label: string; color: string; bg: string }> = {
  pending_upload: { label: "제출대기", color: "text-[#9ca3af]", bg: "bg-[#9ca3af]/15" },
  pending_review: { label: "검토중", color: "text-yellow-400", bg: "bg-yellow-400/15" },
  sent: { label: "완료", color: "text-green-400", bg: "bg-green-400/15" },
};

const teacherOptions = ["전체", "김수학", "박미적", "이정석", "최확통"];
const statusOptions: { value: "전체" | AssignmentStatus; label: string }[] = [
  { value: "전체", label: "전체" },
  { value: "pending_upload", label: "제출대기" },
  { value: "pending_review", label: "검토중" },
  { value: "sent", label: "완료" },
];

function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = statusConfig[assignment.status];

  return (
    <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#2a2d3e] flex items-center justify-center flex-shrink-0">
            <ClipboardText size={16} weight="light" className="text-[#9ca3af]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">{assignment.studentName}</span>
              <span className="text-xs text-[#9ca3af]">·</span>
              <span className="text-xs text-[#9ca3af]">{assignment.teacherName}</span>
            </div>
            <p className="text-xs text-[#9ca3af] mt-0.5">{assignment.chapterTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
            {cfg.label}
          </span>
          {expanded ? (
            <CaretUp size={14} weight="light" className="text-[#9ca3af]" />
          ) : (
            <CaretDown size={14} weight="light" className="text-[#9ca3af]" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[#2a2d3e] px-5 py-4 space-y-4">
          {/* Read-only label */}
          <div className="flex items-center justify-end">
            <span className="flex items-center gap-1 text-[10px] text-[#9ca3af]">
              <Lock size={10} weight="light" />
              열람 전용
            </span>
          </div>

          {/* Problem */}
          <div>
            <p className="text-xs font-medium text-[#9ca3af] mb-1.5">문제</p>
            <div className="bg-[#2a2d3e] rounded-lg px-3.5 py-3 text-sm text-[#e4e4e7] leading-relaxed">
              {assignment.problemText}
            </div>
          </div>

          {/* Student answer */}
          <div>
            <p className="text-xs font-medium text-[#9ca3af] mb-1.5">학생 답안</p>
            <div className="bg-[#2a2d3e] rounded-lg px-3.5 py-8 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#3a3d4e]">
              {assignment.status === "pending_upload" ? (
                <p className="text-xs text-[#9ca3af]">아직 제출되지 않았습니다</p>
              ) : (
                <>
                  <div className="w-20 h-20 bg-[#3a3d4e] rounded-lg flex items-center justify-center">
                    <ClipboardText size={28} weight="light" className="text-[#9ca3af]" />
                  </div>
                  <p className="text-xs text-[#9ca3af]">답안 이미지</p>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3a3d4e] hover:bg-[#4a4d5e] text-[#9ca3af] hover:text-white text-xs rounded-lg transition-colors mt-1">
                    <DownloadSimple size={13} weight="light" />
                    다운로드
                  </button>
                </>
              )}
            </div>
          </div>

          {/* AI Result */}
          {assignment.aiFeedback && (
            <div>
              <p className="text-xs font-medium text-[#9ca3af] mb-1.5">AI 채점 결과</p>
              <div className="bg-[#2a2d3e] rounded-lg px-3.5 py-3">
                <div className="flex items-center gap-2 mb-2">
                  {assignment.isCorrect ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-green-400">
                      <CheckCircle size={14} weight="fill" />
                      정답
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                      <XCircle size={14} weight="fill" />
                      오답
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#e4e4e7] leading-relaxed">{assignment.aiFeedback}</p>
              </div>
            </div>
          )}

          {/* Teacher Feedback */}
          {assignment.teacherFeedback && (
            <div>
              <p className="text-xs font-medium text-[#9ca3af] mb-1.5">선생님 피드백</p>
              <div className="bg-[#2a2d3e] rounded-lg px-3.5 py-3">
                <p className="text-sm text-[#e4e4e7] leading-relaxed">{assignment.teacherFeedback}</p>
              </div>
            </div>
          )}

          {/* No content yet */}
          {assignment.status === "pending_review" && !assignment.aiFeedback && (
            <div className="text-center py-2">
              <p className="text-xs text-[#9ca3af]">AI 채점이 진행 중입니다...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AssignmentsPage() {
  const [filterTeacher, setFilterTeacher] = useState("전체");
  const [filterStatus, setFilterStatus] = useState<"전체" | AssignmentStatus>("전체");

  const filtered = mockAssignments.filter((a) => {
    const matchTeacher = filterTeacher === "전체" || a.teacherName === filterTeacher;
    const matchStatus = filterStatus === "전체" || a.status === filterStatus;
    return matchTeacher && matchStatus;
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">과제 확인</h1>
        <p className="text-sm text-[#9ca3af] mt-1">
          학생 과제 제출물을 확인하고 AI 답변을 볼 수 있습니다 (수정 불가)
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <select
          value={filterTeacher}
          onChange={(e) => setFilterTeacher(e.target.value)}
          className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] focus:outline-none focus:border-green-400/50"
        >
          {teacherOptions.map((t) => (
            <option key={t} value={t}>{t === "전체" ? "강사 전체" : t}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as "전체" | AssignmentStatus)}
          className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] focus:outline-none focus:border-green-400/50"
        >
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>{s.label === "전체" ? "상태 전체" : s.label}</option>
          ))}
        </select>
        <span className="ml-auto text-xs text-[#9ca3af] self-center">{filtered.length}건</span>
      </div>

      {/* Assignment Cards */}
      <div className="space-y-3">
        {filtered.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
}
