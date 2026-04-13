"use client";

import { useData } from "@/context/DataContext";
import { Star } from "@phosphor-icons/react";
import Link from "next/link";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          weight={i <= Math.round(rating) ? "fill" : "light"}
          className={i <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function StudentDiscoverPage() {
  const { teachers, schools } = useData();

  const lecturers = teachers.filter((t) => t.isLecturer);

  const getSchoolName = (id: string) =>
    schools.find((s) => s.id === id)?.name ?? id;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-1">
        내 학교 선생님 찾기
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        내신 전문 강사를 찾아보세요
      </p>

      <div className="grid grid-cols-2 gap-4">
        {lecturers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-base font-bold text-gray-900">
                  {teacher.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{teacher.subject}</p>
              </div>
              <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-medium flex-shrink-0">
                {teacher.experience}
              </span>
            </div>

            <p className="text-xs text-gray-400 mb-3">{teacher.university}</p>

            <div className="flex items-center justify-between mb-3">
              <StarRating rating={teacher.rating} />
              <span className="text-xs text-gray-400">
                수강생 {teacher.subscribers}명
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-3 flex-1">
              {teacher.intro}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {teacher.schools.map((sid) => (
                <span
                  key={sid}
                  className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded"
                >
                  {getSchoolName(sid)}
                </span>
              ))}
            </div>

            <Link
              href={`/student/teacher/${teacher.id}`}
              className="w-full text-center text-xs font-medium text-blue-600 border border-blue-200 rounded-lg py-2 hover:bg-blue-50 transition-colors"
            >
              자세히 보기
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
