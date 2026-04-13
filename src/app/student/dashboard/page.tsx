"use client";

import { useData } from "@/context/DataContext";
import { Star } from "@phosphor-icons/react";

const MESSAGE_TYPE_STYLES: Record<string, { label: string; className: string }> = {
  nudge: { label: "독려", className: "bg-blue-50 text-blue-600" },
  praise: { label: "칭찬", className: "bg-green-50 text-green-600" },
  warning: { label: "경고", className: "bg-orange-50 text-orange-600" },
  assignment: { label: "과제", className: "bg-purple-50 text-purple-600" },
  general: { label: "일반", className: "bg-gray-100 text-gray-600" },
};

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

export default function StudentDashboardPage() {
  const { teachers, subscriptions, lectures, platformMessages } = useData();

  const mySubscriptions = subscriptions.filter(
    (s) => s.studentId === "st1" && s.status === "active"
  );
  const subscribedTeacherIds = mySubscriptions.map((s) => s.teacherId);
  const subscribedTeachers = teachers.filter((t) =>
    subscribedTeacherIds.includes(t.id)
  );

  const subscribedLectures = lectures.filter((l) =>
    subscribedTeacherIds.includes(l.teacherId)
  );

  // st1 progress from mock: { c1: 100, c2: 100, c3: 45, c4: 0 }
  const lectureProgress: Record<string, number> = {
    l1: 45,
    l2: 100,
  };

  const myMessages = platformMessages
    .filter((m) => m.toStudentId === "st1")
    .slice(0, 3);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-1">
        안녕하세요, 이하은님
      </h1>
      <p className="text-sm text-gray-500 mb-6">오늘의 학습 현황을 확인하세요</p>

      {/* 구독 중인 선생님 */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-gray-900 mb-3">
          구독 중인 선생님
        </h2>
        {subscribedTeachers.length === 0 ? (
          <p className="text-sm text-gray-400">구독 중인 선생님이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {subscribedTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white border border-gray-200 rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {teacher.name}
                    </p>
                    <p className="text-xs text-gray-500">{teacher.subject}</p>
                  </div>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-medium">
                    구독중
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{teacher.university}</p>
                <StarRating rating={teacher.rating} />
                <p className="text-xs text-gray-400 mt-2">
                  수강생 {teacher.subscribers}명
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 학습 현황 */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-gray-900 mb-3">학습 현황</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          {subscribedLectures.length === 0 ? (
            <p className="text-sm text-gray-400">수강 중인 강의가 없습니다.</p>
          ) : (
            subscribedLectures.map((lecture) => {
              const progress = lectureProgress[lecture.id] ?? 0;
              return (
                <div key={lecture.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm text-gray-900 font-medium">
                      {lecture.title}
                    </p>
                    <span className="text-xs text-gray-500">{progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 최근 메시지 */}
      <section>
        <h2 className="text-sm font-bold text-gray-900 mb-3">최근 메시지</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
          {myMessages.length === 0 ? (
            <p className="text-sm text-gray-400">받은 메시지가 없습니다.</p>
          ) : (
            myMessages.map((msg) => {
              const style =
                MESSAGE_TYPE_STYLES[msg.type] ?? MESSAGE_TYPE_STYLES.general;
              return (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0"
                >
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium flex-shrink-0 mt-0.5 ${style.className}`}
                  >
                    {style.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {msg.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{msg.content}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
