"use client";

import { useData } from "@/context/DataContext";
import { Star } from "@phosphor-icons/react";

const MESSAGE_TYPE_STYLES: Record<string, { label: string; className: string }> = {
  nudge: { label: "독려", className: "bg-[#C9E535]/20 text-[#1A1A18]" },
  praise: { label: "칭찬", className: "bg-green-100 text-green-700" },
  warning: { label: "경고", className: "bg-orange-100 text-orange-700" },
  assignment: { label: "과제", className: "bg-[#EBE7DA] text-[#6B6B68]" },
  general: { label: "일반", className: "bg-[#EBE7DA] text-[#6B6B68]" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          weight={i <= Math.round(rating) ? "fill" : "light"}
          className={i <= Math.round(rating) ? "text-[#C9E535]" : "text-[#1A1A18]/20"}
        />
      ))}
      <span className="text-xs text-[#6B6B68] ml-1">{rating.toFixed(1)}</span>
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
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A18] mb-1">
        안녕하세요, 이하은님
      </h1>
      <p className="text-sm text-[#6B6B68] mb-8">오늘의 학습 현황을 확인하세요</p>

      {/* 구독 중인 선생님 */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-[#1A1A18] mb-3">
          구독 중인 선생님
        </h2>
        {subscribedTeachers.length === 0 ? (
          <p className="text-sm text-[#6B6B68]">구독 중인 선생님이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {subscribedTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-xl border border-black/10 p-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-bold text-[#1A1A18]">
                      {teacher.name}
                    </p>
                    <p className="text-xs text-[#6B6B68]">{teacher.subject}</p>
                  </div>
                  <span className="text-[10px] bg-[#C9E535]/20 text-[#1A1A18] px-2 py-0.5 rounded font-medium">
                    구독중
                  </span>
                </div>
                <p className="text-xs text-[#6B6B68] mb-2">{teacher.university}</p>
                <StarRating rating={teacher.rating} />
                <p className="text-xs text-[#6B6B68] mt-2">
                  수강생 {teacher.subscribers}명
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 학습 현황 */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-[#1A1A18] mb-3">학습 현황</h2>
        <div className="bg-white rounded-xl border border-black/10 p-6 space-y-4">
          {subscribedLectures.length === 0 ? (
            <p className="text-sm text-[#6B6B68]">수강 중인 강의가 없습니다.</p>
          ) : (
            subscribedLectures.map((lecture) => {
              const progress = lectureProgress[lecture.id] ?? 0;
              return (
                <div key={lecture.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm text-[#1A1A18] font-medium">
                      {lecture.title}
                    </p>
                    <span className="text-xs text-[#6B6B68]">{progress}%</span>
                  </div>
                  <div className="h-2 bg-[#EBE7DA] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C9E535] rounded-full transition-all"
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
        <h2 className="text-sm font-bold text-[#1A1A18] mb-3">최근 메시지</h2>
        <div className="bg-white rounded-xl border border-black/10 p-6 space-y-3">
          {myMessages.length === 0 ? (
            <p className="text-sm text-[#6B6B68]">받은 메시지가 없습니다.</p>
          ) : (
            myMessages.map((msg) => {
              const style =
                MESSAGE_TYPE_STYLES[msg.type] ?? MESSAGE_TYPE_STYLES.general;
              return (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 py-2 border-b border-black/5 last:border-0"
                >
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium flex-shrink-0 mt-0.5 ${style.className}`}
                  >
                    {style.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1A18] truncate">
                      {msg.title}
                    </p>
                    <p className="text-xs text-[#6B6B68] truncate">{msg.content}</p>
                  </div>
                  <span className="text-xs text-[#6B6B68] flex-shrink-0">
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
