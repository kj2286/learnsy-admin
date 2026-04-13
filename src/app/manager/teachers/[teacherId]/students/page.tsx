"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, User } from "@phosphor-icons/react";
import {
  mockPlatformStudents,
  mockSubscriptions,
  getPlatformTeacherById,
  getSchoolById,
} from "@/data/mock-platform";

interface PageProps {
  params: Promise<{ teacherId: string }>;
}

function calcAverageProgress(progress: Record<string, number>): number {
  const values = Object.values(progress);
  if (values.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export default function TeacherStudentsPage({ params }: PageProps) {
  const { teacherId } = use(params);
  const teacher = getPlatformTeacherById(teacherId);

  const activeStudentIds = new Set(
    mockSubscriptions
      .filter((sub) => sub.teacherId === teacherId && sub.status === "active")
      .map((sub) => sub.studentId)
  );

  const students = mockPlatformStudents.filter((s) =>
    activeStudentIds.has(s.id)
  );

  if (!teacher) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#9ca3af]">강사 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/manager/teachers"
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1c1f2e] border border-[#2a2d3e] text-[#9ca3af] hover:text-white transition-colors"
        >
          <ArrowLeft size={16} weight="light" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-white">
            {teacher.name} 선생님 학생 목록
          </h1>
          <p className="text-sm text-[#9ca3af] mt-0.5">
            활성 구독 학생 {students.length}명
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl overflow-hidden">
        {students.length === 0 ? (
          <div className="p-12 text-center text-sm text-[#9ca3af]">
            활성 구독 학생이 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2d3e]">
                  <th className="text-left text-xs text-[#9ca3af] font-medium px-5 py-3.5">이름</th>
                  <th className="text-left text-xs text-[#9ca3af] font-medium px-4 py-3.5">학교</th>
                  <th className="text-left text-xs text-[#9ca3af] font-medium px-4 py-3.5">학년</th>
                  <th className="text-left text-xs text-[#9ca3af] font-medium px-4 py-3.5">계열</th>
                  <th className="text-left text-xs text-[#9ca3af] font-medium px-4 py-3.5">연락처</th>
                  <th className="text-left text-xs text-[#9ca3af] font-medium px-4 py-3.5">구독 시작일</th>
                  <th className="text-left text-xs text-[#9ca3af] font-medium px-4 py-3.5 min-w-[140px]">학습 진행률</th>
                  <th className="text-right text-xs text-[#9ca3af] font-medium px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2d3e]">
                {students.map((student) => {
                  const school = getSchoolById(student.school);
                  const sub = mockSubscriptions.find(
                    (s) => s.studentId === student.id && s.teacherId === teacherId
                  );
                  const avg = calcAverageProgress(student.progress);

                  return (
                    <tr key={student.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#2a2d3e] flex items-center justify-center flex-shrink-0">
                            <User size={12} weight="light" className="text-[#9ca3af]" />
                          </div>
                          <span className="text-white font-medium">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[#9ca3af]">{school?.name ?? "-"}</td>
                      <td className="px-4 py-4 text-[#9ca3af]">{student.grade}학년</td>
                      <td className="px-4 py-4 text-[#9ca3af]">{student.track}</td>
                      <td className="px-4 py-4 text-[#9ca3af]">
                        {student.phone || <span className="text-[#4b5563]">-</span>}
                      </td>
                      <td className="px-4 py-4 text-[#9ca3af]">
                        {sub?.startDate ?? "-"}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex-1 h-1.5 bg-[#2a2d3e] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-400 rounded-full transition-all"
                              style={{ width: `${avg}%` }}
                            />
                          </div>
                          <span className="text-xs text-[#9ca3af] w-8 text-right">{avg}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/manager/student-profile/${student.id}`}
                          className="text-xs text-green-400 hover:text-green-300 transition-colors"
                        >
                          프로필 보기 →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
