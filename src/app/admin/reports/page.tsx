"use client";

import { mockReports, mockSchools, mockPlatformTeachers, getSchoolById, getPlatformTeacherById } from "@/data/mock-platform";

export default function ReportsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold">내신 분석 리포트</h1>
        <p className="text-sm text-admin-text-muted mt-1">학교별 내신 출제 경향 분석 리포트</p>
      </div>

      <div className="grid gap-4">
        {mockReports.map((report) => {
          const school = getSchoolById(report.schoolId);
          return (
            <div key={report.id} className="p-5 rounded-lg bg-admin-card border border-admin-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold">{report.title}</h2>
                  <p className="text-xs text-admin-text-muted mt-1">
                    {school?.name} &middot; {school?.region} &middot; 작성일 {report.createdAt}
                  </p>
                </div>
                <div className="flex gap-1">
                  {report.assignedTeachers.map((tid) => (
                    <span key={tid} className="text-xs bg-admin-accent/10 text-admin-accent px-2 py-0.5 rounded">
                      {getPlatformTeacherById(tid)?.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <ReflectionBar label="교과서 반영률" value={report.textbookReflection} color="bg-blue-500" />
                <ReflectionBar label="EBS 반영률" value={report.ebsReflection} color="bg-green-500" />
                <ReflectionBar label="사관학교 반영률" value={report.militaryAcademyReflection} color="bg-orange-500" />
                <ReflectionBar label="부교재 반영률" value={report.supplementReflection} color="bg-purple-500" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReflectionBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-admin-text-muted">{label}</span>
        <span className="text-xs font-bold">{value}%</span>
      </div>
      <div className="h-2 bg-admin-border rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
