"use client";

import { useData } from "@/context/DataContext";
import { BookOpen, FilePdf, VideoCamera, ListChecks, PencilSimple } from "@phosphor-icons/react";

const contentTypeLabel: Record<string, string> = {
  video: "영상",
  pdf: "PDF",
  problem_set: "문제 세트",
};

const contentTypeIcon = {
  video: VideoCamera,
  pdf: FilePdf,
  problem_set: ListChecks,
};

const contentTypeColor: Record<string, string> = {
  video: "text-blue-600 bg-blue-50",
  pdf: "text-red-500 bg-red-50",
  problem_set: "text-purple-600 bg-purple-50",
};

export default function TeacherContentPage() {
  const { lectures, contents, schools } = useData();

  const myLectures = lectures.filter((l) => l.teacherId === "t1");
  const myContents = contents.filter((c) => c.assignedTeachers.includes("t1"));

  const getSchoolName = (id: string) => schools.find((s) => s.id === id)?.name ?? id;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-6">강의 콘텐츠</h1>

      {/* Lectures */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">내 강의</h2>
        <div className="grid grid-cols-1 gap-3">
          {myLectures.map((lecture) => (
            <div key={lecture.id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <BookOpen size={20} weight="light" className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{lecture.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{lecture.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {getSchoolName(lecture.schoolId)}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {lecture.grade}학년
                      </span>
                      <span className="text-xs text-gray-400">
                        {lecture.totalChapters}강
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors flex-shrink-0">
                    <PencilSimple size={13} weight="light" />
                    편집
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contents */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">콘텐츠 자료</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {myContents.length === 0 ? (
            <div className="text-center py-10 text-sm text-gray-400">배정된 콘텐츠가 없습니다.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {myContents.map((content) => {
                const Icon = contentTypeIcon[content.type] ?? BookOpen;
                const colorClass = contentTypeColor[content.type] ?? "text-gray-500 bg-gray-50";
                return (
                  <div key={content.id} className="flex items-center gap-4 p-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                      <Icon size={18} weight="light" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{content.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">{contentTypeLabel[content.type]}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{getSchoolName(content.schoolId)}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{content.grade}학년</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-gray-400">{content.version}</span>
                      <span className="text-xs text-gray-300">{content.createdAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
