"use client";

import { useData } from "@/context/DataContext";

interface BarItem {
  label: string;
  value: number;
  barClass: string;
  textClass: string;
}

function ReportCard({ report, schoolName }: { report: { id: string; title: string; createdAt: string; textbookReflection: number; ebsReflection: number; militaryAcademyReflection: number; supplementReflection: number }; schoolName: string }) {
  const bars: BarItem[] = [
    { label: "교과서 반영률",  value: report.textbookReflection,         barClass: "bg-blue-500",   textClass: "text-blue-600" },
    { label: "EBS 반영률",    value: report.ebsReflection,              barClass: "bg-green-500",  textClass: "text-green-600" },
    { label: "사관학교 반영률", value: report.militaryAcademyReflection,  barClass: "bg-orange-500", textClass: "text-orange-600" },
    { label: "부교재 반영률",  value: report.supplementReflection,       barClass: "bg-purple-500", textClass: "text-purple-600" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">{schoolName}</span>
          <h3 className="text-sm font-semibold text-gray-900 mt-2">{report.title}</h3>
        </div>
        <span className="text-xs text-gray-400 flex-shrink-0">{report.createdAt}</span>
      </div>

      <div className="space-y-3">
        {bars.map((bar) => (
          <div key={bar.label} className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-28 flex-shrink-0">{bar.label}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${bar.barClass}`}
                style={{ width: `${bar.value}%` }}
              />
            </div>
            <span className={`text-xs font-semibold w-8 text-right flex-shrink-0 ${bar.textClass}`}>
              {bar.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeacherReportsPage() {
  const { reports, schools } = useData();

  const myReports = reports.filter((r) => r.assignedTeachers.includes("t1"));
  const getSchoolName = (id: string) => schools.find((s) => s.id === id)?.name ?? id;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-1">내신 분석 리포트</h1>
      <p className="text-sm text-gray-500 mb-6">담당 학교의 출제 경향 분석 결과입니다</p>

      {myReports.length === 0 ? (
        <div className="text-center py-16 text-sm text-gray-400">배정된 리포트가 없습니다.</div>
      ) : (
        <div className="space-y-4">
          {myReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              schoolName={getSchoolName(report.schoolId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
