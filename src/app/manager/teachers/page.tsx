"use client";

import Link from "next/link";
import {
  ChalkboardTeacher,
  Star,
  Student,
  ChatCircle,
} from "@phosphor-icons/react";
import {
  mockManagers,
  mockPlatformTeachers,
  mockSubscriptions,
  getSchoolById,
} from "@/data/mock-platform";

const manager = mockManagers[0]; // 홍매니저 (m1)

const assignedTeachers = mockPlatformTeachers.filter((t) =>
  manager.assignedTeachers.includes(t.id)
);

function getActiveStudentCount(teacherId: string) {
  return new Set(
    mockSubscriptions
      .filter((sub) => sub.teacherId === teacherId && sub.status === "active")
      .map((sub) => sub.studentId)
  ).size;
}

export default function ManagerTeachersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-white">담당 강사</h1>
        <p className="text-sm text-[#9ca3af] mt-1">
          총 {assignedTeachers.length}명의 강사를 관리하고 있습니다.
        </p>
      </div>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {assignedTeachers.map((teacher) => {
          const studentCount = getActiveStudentCount(teacher.id);
          const schools = teacher.schools.map((sid) => getSchoolById(sid)?.name ?? sid);

          return (
            <div
              key={teacher.id}
              className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl p-6 flex flex-col gap-5"
            >
              {/* Top: avatar + info */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-400/10 flex items-center justify-center flex-shrink-0">
                  <ChalkboardTeacher size={22} weight="light" className="text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-white">{teacher.name}</h2>
                    <div className="flex items-center gap-1">
                      <Star size={12} weight="fill" className="text-yellow-400" />
                      <span className="text-xs text-[#9ca3af]">{teacher.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#9ca3af] mt-0.5">{teacher.subject}</p>
                  <p className="text-xs text-[#9ca3af] mt-0.5">{teacher.university}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-[#9ca3af] w-20 flex-shrink-0">담당 학교</span>
                  <div className="flex flex-wrap gap-1">
                    {schools.map((school) => (
                      <span
                        key={school}
                        className="text-xs bg-[#2a2d3e] text-[#e4e4e7] px-2 py-0.5 rounded"
                      >
                        {school}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#9ca3af] w-20 flex-shrink-0">활성 학생</span>
                  <div className="flex items-center gap-1.5">
                    <Student size={14} weight="light" className="text-green-400" />
                    <span className="text-green-400 font-medium">{studentCount}명</span>
                  </div>
                </div>
              </div>

              {/* Intro */}
              <p className="text-xs text-[#9ca3af] leading-relaxed border-t border-[#2a2d3e] pt-4">
                {teacher.intro}
              </p>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <Link
                  href={`/manager/teachers/${teacher.id}/students`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-green-400/10 text-green-400 text-sm font-medium hover:bg-green-400/20 transition-colors"
                >
                  <Student size={15} weight="light" />
                  학생 목록
                </Link>
                <Link
                  href="/manager/consultations"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#2a2d3e] text-[#e4e4e7] text-sm font-medium hover:bg-[#333649] transition-colors"
                >
                  <ChatCircle size={15} weight="light" />
                  상담 내역
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
