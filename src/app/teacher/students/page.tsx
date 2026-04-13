"use client";

import { useData } from "@/context/DataContext";

export default function TeacherStudentsPage() {
  const { students, subscriptions, schools } = useData();

  const mySubscriptions = subscriptions.filter((s) => s.teacherId === "t1" && s.status === "active");
  const subscribedStudentIds = new Set(mySubscriptions.map((s) => s.studentId));
  const myStudents = students.filter((st) => subscribedStudentIds.has(st.id));

  const getSchoolName = (id: string) => schools.find((s) => s.id === id)?.name ?? id;

  const getSubscription = (studentId: string) =>
    mySubscriptions.find((s) => s.studentId === studentId);

  const calcProgress = (progress: Record<string, number>): number => {
    const values = Object.values(progress);
    if (values.length === 0) return 0;
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">학생 관리</h1>
          <p className="text-sm text-gray-500">수강 중인 학생 {myStudents.length}명</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-semibold text-gray-400 px-5 py-3">이름</th>
              <th className="text-left text-xs font-semibold text-gray-400 px-4 py-3">학교</th>
              <th className="text-left text-xs font-semibold text-gray-400 px-4 py-3">학년</th>
              <th className="text-left text-xs font-semibold text-gray-400 px-4 py-3">계열</th>
              <th className="text-left text-xs font-semibold text-gray-400 px-4 py-3">연락처</th>
              <th className="text-left text-xs font-semibold text-gray-400 px-4 py-3">수강 시작</th>
              <th className="text-left text-xs font-semibold text-gray-400 px-4 py-3 w-40">진도율</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {myStudents.map((student) => {
              const sub = getSubscription(student.id);
              const progress = calcProgress(student.progress);
              return (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <span className="font-medium text-gray-900">{student.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{getSchoolName(student.school)}</td>
                  <td className="px-4 py-3 text-gray-600">{student.grade}학년</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      student.track === "이과" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-600"
                    }`}>
                      {student.track}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {student.phone || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {sub?.startDate ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8 text-right">{progress}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
