"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Buildings, Users, CaretRight } from "@phosphor-icons/react";
import { mockPlatformTeachers, mockPlatformStudents, mockSchools, mockSubscriptions, getSchoolById } from "@/data/mock-platform";
import SearchInput from "@/components/shared/SearchInput";

export default function TeacherManagementPage() {
  const [search, setSearch] = useState("");

  const teachersWithStats = mockPlatformTeachers.map((teacher) => {
    const schools = teacher.schools.map((sid) => getSchoolById(sid)).filter(Boolean);
    const regions = [...new Set(schools.map((s) => s!.region))];
    const activeSubscriptions = mockSubscriptions.filter(
      (s) => s.teacherId === teacher.id && s.status === "active"
    );
    const studentCount = activeSubscriptions.length;

    return {
      ...teacher,
      schoolNames: schools.map((s) => s!.name),
      regions,
      studentCount,
    };
  });

  const filtered = search
    ? teachersWithStats.filter(
        (t) =>
          t.name.includes(search) ||
          t.schoolNames.some((s) => s.includes(search)) ||
          t.subject.includes(search)
      )
    : teachersWithStats;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">강사관리</h1>
          <p className="text-sm text-admin-text-muted mt-1">등록된 강사 목록 및 관리</p>
        </div>
        <SearchInput
          placeholder="강사명, 학교, 과목 검색"
          value={search}
          onChange={setSearch}
          className="w-64"
        />
      </div>

      <div className="grid gap-3">
        {filtered.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-admin-card border border-admin-border rounded-xl p-5 hover:border-admin-accent/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-admin-accent/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-admin-accent">{teacher.name[0]}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-admin-text">{teacher.name}</h3>
                  <span className="text-xs bg-admin-border px-2 py-0.5 rounded text-admin-text-muted">
                    {teacher.subject}
                  </span>
                  {teacher.isLecturer && (
                    <span className="text-[10px] bg-green-500/15 text-green-400 px-2 py-0.5 rounded">
                      인강 강사
                    </span>
                  )}
                  <div className="flex items-center gap-0.5 ml-2">
                    <Star size={12} weight="fill" className="text-yellow-400" />
                    <span className="text-xs text-admin-text-muted">{teacher.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-admin-text-muted">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} weight="light" />
                    {teacher.regions.join(", ")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Buildings size={12} weight="light" />
                    {teacher.schoolNames.join(", ")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} weight="light" />
                    관리학생 {teacher.studentCount}명
                  </span>
                </div>
              </div>

              {/* Sub-page links */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/teachers/${teacher.id}/students`}
                  className="text-xs px-3 py-1.5 rounded-lg border border-admin-border text-admin-text-muted hover:text-admin-text hover:border-admin-accent/50 transition-colors"
                >
                  수강관리
                </Link>
                <Link
                  href={`/admin/teachers/${teacher.id}/student-info`}
                  className="text-xs px-3 py-1.5 rounded-lg border border-admin-border text-admin-text-muted hover:text-admin-text hover:border-admin-accent/50 transition-colors"
                >
                  학생정보
                </Link>
                <Link
                  href={`/admin/teachers/${teacher.id}/courses`}
                  className="text-xs px-3 py-1.5 rounded-lg border border-admin-border text-admin-text-muted hover:text-admin-text hover:border-admin-accent/50 transition-colors"
                >
                  강의등록
                </Link>
                <CaretRight size={16} className="text-admin-text-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
