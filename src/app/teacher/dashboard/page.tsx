"use client";

import { Question, CheckSquare, Users } from "@phosphor-icons/react";
import Link from "next/link";

const stats = [
  { label: "수강생", value: "47명", icon: Users, color: "text-blue-600 bg-blue-50" },
  { label: "대기 질문", value: "5건", icon: Question, color: "text-orange-600 bg-orange-50" },
  { label: "채점 대기", value: "3건", icon: CheckSquare, color: "text-purple-600 bg-purple-50" },
];

const recentActivity = [
  { type: "질문", student: "이하은", content: "미분계수 구할 때 극한값이 존재하지 않는 경우는?", time: "5분 전" },
  { type: "과제", student: "김민수", content: "lim(x→0) sin(x)/x 과제 제출", time: "23분 전" },
  { type: "질문", student: "박서연", content: "접선의 방정식 구하는 공식이 헷갈려요", time: "1시간 전" },
  { type: "과제", student: "강도윤", content: "극값 구하기 과제 제출", time: "3시간 전" },
  { type: "질문", student: "이하은", content: "샌드위치 정리 적용 방법이 궁금합니다", time: "5시간 전" },
];

export default function TeacherDashboardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-1">안녕하세요, 김수학 선생님</h1>
      <p className="text-sm text-gray-500 mb-6">오늘의 현황을 확인하세요</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                <Icon size={20} weight="light" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm font-medium text-yellow-800">대기 중인 질문 5건</p>
          <p className="text-xs text-yellow-600 mt-1">AI 초안이 준비되었습니다</p>
          <Link href="/teacher/questions" className="text-xs text-yellow-700 font-medium mt-2 inline-block hover:underline">확인하기 →</Link>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm font-medium text-green-800">채점 대기 과제 3건</p>
          <p className="text-xs text-green-600 mt-1">AI 채점이 완료되었습니다</p>
          <Link href="/teacher/grading" className="text-xs text-green-700 font-medium mt-2 inline-block hover:underline">확인하기 →</Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">최근 학생 활동</h2>
        <div className="space-y-3">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${a.type === "질문" ? "bg-orange-50 text-orange-600" : "bg-purple-50 text-purple-600"}`}>{a.type}</span>
              <span className="text-sm text-gray-900 font-medium w-16">{a.student}</span>
              <span className="text-sm text-gray-600 truncate flex-1">{a.content}</span>
              <span className="text-xs text-gray-400 flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
