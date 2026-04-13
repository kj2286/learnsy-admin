"use client";

import { useState } from "react";
import {
  EnvelopeSimple,
  MegaphoneSimple,
  Star,
  Warning,
  PlusCircle,
  CalendarBlank,
  Clock,
  DeviceMobile,
  Globe,
  PaperPlaneTilt,
  X,
} from "@phosphor-icons/react";

interface MessageEntry {
  id: string;
  type: "notice" | "praise" | "warning";
  title: string;
  content: string;
  studentName: string;
  teacherName: string;
  status: "sent" | "scheduled";
  scheduledAt?: string;
  sentAt?: string;
}

const mockMessages: MessageEntry[] = [
  { id: "msg1", type: "praise", title: "전 강의 완주 축하!", content: "도윤아, 모든 강의를 완주했네요! 대단합니다. 중간고사도 이 기세로!", studentName: "강도윤", teacherName: "김수학", status: "sent", sentAt: "2026-04-08 15:00" },
  { id: "msg2", type: "warning", title: "진도가 좀 느려요", content: "서연아, 지난주보다 학습량이 줄었어요. 혹시 어려운 부분이 있으면 질문해주세요!", studentName: "박서연", teacherName: "김수학", status: "sent", sentAt: "2026-04-09 10:00" },
  { id: "msg3", type: "notice", title: "중간고사 대비 특강 안내", content: "4월 15일 오후 8시에 중간고사 대비 특강이 진행됩니다. 꼭 참여해주세요!", studentName: "이하은", teacherName: "김수학", status: "scheduled", scheduledAt: "2026-04-13 12:00" },
  { id: "msg4", type: "praise", title: "잘하고 있어요!", content: "민수야, 이번 주 꾸준히 강의 듣고 있구나! 계속 이 페이스로 가면 중간고사 잘 볼 수 있을 거야.", studentName: "김민수", teacherName: "김수학", status: "sent", sentAt: "2026-04-09 18:00" },
  { id: "msg5", type: "warning", title: "과제 미제출 알림", content: "현우야, 이번 주 과제를 아직 제출하지 않았어요. 내일까지 꼭 제출해주세요.", studentName: "정현우", teacherName: "박미적", status: "sent", sentAt: "2026-04-10 09:00" },
  { id: "msg6", type: "notice", title: "4월 모의고사 일정 안내", content: "4월 20일 전국 모의고사 일정을 공지합니다. 미리 준비해두세요.", studentName: "임채원", teacherName: "박미적", status: "scheduled", scheduledAt: "2026-04-14 09:00" },
  { id: "msg7", type: "praise", title: "1등급 달성 축하!", content: "채원아, 지난 모의고사 1등급 달성을 진심으로 축하해요!", studentName: "임채원", teacherName: "박미적", status: "sent", sentAt: "2026-04-07 16:30" },
  { id: "msg8", type: "notice", title: "수업 자료 업로드 완료", content: "3강 수업 자료가 업로드되었습니다. 수업 전에 미리 확인해주세요.", studentName: "오태양", teacherName: "최확통", status: "sent", sentAt: "2026-04-08 20:00" },
  { id: "msg9", type: "warning", title: "출석률 저조 알림", content: "태양아, 이번 달 출석률이 60%에요. 꾸준히 참여해야 효과가 있어요.", studentName: "오태양", teacherName: "최확통", status: "scheduled", scheduledAt: "2026-04-15 10:00" },
  { id: "msg10", type: "praise", title: "문제풀이 만점 축하!", content: "하은아, 이번 문제풀이 세트에서 만점을 받았어요! 정말 대단해요.", studentName: "이하은", teacherName: "김수학", status: "sent", sentAt: "2026-04-06 14:00" },
];

const typeConfig = {
  notice: { label: "공지사항", color: "text-blue-400", bg: "bg-blue-400/15", Icon: MegaphoneSimple },
  praise: { label: "칭찬", color: "text-green-400", bg: "bg-green-400/15", Icon: Star },
  warning: { label: "질책", color: "text-orange-400", bg: "bg-orange-400/15", Icon: Warning },
};

const teacherOptions = ["전체", "김수학", "박미적", "이정석", "최확통"];
const typeOptions = ["전체", "공지사항", "칭찬", "질책"] as const;

export default function MessagesPage() {
  const [filterTeacher, setFilterTeacher] = useState("전체");
  const [filterType, setFilterType] = useState("전체");
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formTeacher, setFormTeacher] = useState("");
  const [formStudent, setFormStudent] = useState("");
  const [formType, setFormType] = useState<"notice" | "praise" | "warning">("notice");
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [sendMode, setSendMode] = useState<"immediate" | "scheduled">("immediate");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [channelSms, setChannelSms] = useState(true);
  const [channelWeb, setChannelWeb] = useState(true);

  const studentsByTeacher: Record<string, string[]> = {
    "김수학": ["이하은", "김민수", "박서연", "강도윤"],
    "박미적": ["김민수", "정현우", "강도윤", "임채원"],
    "이정석": ["한소희", "류지민"],
    "최확통": ["오태양"],
  };

  const filtered = mockMessages.filter((m) => {
    const matchTeacher = filterTeacher === "전체" || m.teacherName === filterTeacher;
    const matchType =
      filterType === "전체" ||
      (filterType === "공지사항" && m.type === "notice") ||
      (filterType === "칭찬" && m.type === "praise") ||
      (filterType === "질책" && m.type === "warning");
    return matchTeacher && matchType;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">메시지 관리</h1>
          <p className="text-sm text-[#9ca3af] mt-1">
            공지사항, 칭찬글, 질책글을 관리하고 발송합니다
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-green-400/20 hover:bg-green-400/30 text-green-400 text-sm rounded-lg transition-colors border border-green-400/30"
        >
          <PlusCircle size={16} weight="light" />
          메시지 작성
        </button>
      </div>

      {/* Compose Form */}
      {showForm && (
        <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">새 메시지 작성</h2>
            <button onClick={() => setShowForm(false)}>
              <X size={16} weight="light" className="text-[#9ca3af] hover:text-white" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Teacher select */}
            <div>
              <label className="block text-xs text-[#9ca3af] mb-1.5">강사 선택</label>
              <select
                value={formTeacher}
                onChange={(e) => { setFormTeacher(e.target.value); setFormStudent(""); }}
                className="w-full bg-[#0f1117] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] focus:outline-none focus:border-green-400/50"
              >
                <option value="">강사를 선택하세요</option>
                {["김수학", "박미적", "이정석", "최확통"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            {/* Student select */}
            <div>
              <label className="block text-xs text-[#9ca3af] mb-1.5">학생 선택</label>
              <select
                value={formStudent}
                onChange={(e) => setFormStudent(e.target.value)}
                disabled={!formTeacher}
                className="w-full bg-[#0f1117] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] focus:outline-none focus:border-green-400/50 disabled:opacity-40"
              >
                <option value="">학생을 선택하세요</option>
                {(studentsByTeacher[formTeacher] ?? []).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Type */}
          <div className="mb-4">
            <label className="block text-xs text-[#9ca3af] mb-1.5">유형 선택</label>
            <div className="flex gap-2">
              {(["notice", "praise", "warning"] as const).map((t) => {
                const cfg = typeConfig[t];
                return (
                  <button
                    key={t}
                    onClick={() => setFormType(t)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                      formType === t
                        ? `${cfg.bg} ${cfg.color} border-current/30`
                        : "border-[#2a2d3e] text-[#9ca3af] hover:border-[#3a3d4e]"
                    }`}
                  >
                    <cfg.Icon size={13} weight="light" />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-xs text-[#9ca3af] mb-1.5">제목</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="메시지 제목을 입력하세요"
              className="w-full bg-[#0f1117] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] placeholder-[#9ca3af] focus:outline-none focus:border-green-400/50"
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block text-xs text-[#9ca3af] mb-1.5">내용</label>
            <textarea
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              placeholder="메시지 내용을 입력하세요"
              rows={3}
              className="w-full bg-[#0f1117] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] placeholder-[#9ca3af] resize-none focus:outline-none focus:border-green-400/50"
            />
          </div>

          {/* Send mode */}
          <div className="mb-4">
            <label className="block text-xs text-[#9ca3af] mb-1.5">발송 방식</label>
            <div className="flex gap-2">
              {(["immediate", "scheduled"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSendMode(mode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                    sendMode === mode
                      ? "bg-green-400/15 text-green-400 border-green-400/30"
                      : "border-[#2a2d3e] text-[#9ca3af] hover:border-[#3a3d4e]"
                  }`}
                >
                  {mode === "immediate" ? (
                    <><PaperPlaneTilt size={13} weight="light" /> 즉시 발송</>
                  ) : (
                    <><CalendarBlank size={13} weight="light" /> 예약 발송</>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Scheduled datetime */}
          {sendMode === "scheduled" && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs text-[#9ca3af] mb-1.5">
                  <CalendarBlank size={11} weight="light" className="inline mr-1" />
                  날짜
                </label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full bg-[#0f1117] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] focus:outline-none focus:border-green-400/50"
                />
              </div>
              <div>
                <label className="block text-xs text-[#9ca3af] mb-1.5">
                  <Clock size={11} weight="light" className="inline mr-1" />
                  시간
                </label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full bg-[#0f1117] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] focus:outline-none focus:border-green-400/50"
                />
              </div>
            </div>
          )}

          {/* Notification channels */}
          <div className="mb-5">
            <label className="block text-xs text-[#9ca3af] mb-1.5">알림 채널</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channelSms}
                  onChange={(e) => setChannelSms(e.target.checked)}
                  className="accent-green-400"
                />
                <DeviceMobile size={13} weight="light" className="text-[#9ca3af]" />
                <span className="text-xs text-[#9ca3af]">문자(카톡)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channelWeb}
                  onChange={(e) => setChannelWeb(e.target.checked)}
                  className="accent-green-400"
                />
                <Globe size={13} weight="light" className="text-[#9ca3af]" />
                <span className="text-xs text-[#9ca3af]">서비스웹 알림</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-5 py-2 bg-green-400 hover:bg-green-300 text-[#0f1117] text-sm font-medium rounded-lg transition-colors">
              <PaperPlaneTilt size={14} weight="bold" />
              발송
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <select
          value={filterTeacher}
          onChange={(e) => setFilterTeacher(e.target.value)}
          className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] focus:outline-none focus:border-green-400/50"
        >
          {teacherOptions.map((t) => <option key={t} value={t}>{t === "전체" ? "강사 전체" : t}</option>)}
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] focus:outline-none focus:border-green-400/50"
        >
          {typeOptions.map((t) => <option key={t} value={t}>{t === "전체" ? "유형 전체" : t}</option>)}
        </select>
        <span className="ml-auto text-xs text-[#9ca3af] self-center">{filtered.length}건</span>
      </div>

      {/* Message List */}
      <div className="space-y-3">
        {filtered.map((msg) => {
          const cfg = typeConfig[msg.type];
          return (
            <div key={msg.id} className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center mt-0.5`}>
                    <cfg.Icon size={15} weight="light" className={cfg.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      <h3 className="text-sm font-medium text-white">{msg.title}</h3>
                    </div>
                    <p className="text-xs text-[#9ca3af] mt-1 line-clamp-1">{msg.content}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-[#9ca3af]">
                      <span>수신: <span className="text-[#e4e4e7]">{msg.studentName}</span></span>
                      <span>·</span>
                      <span>강사: <span className="text-[#e4e4e7]">{msg.teacherName}</span></span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                  {msg.status === "scheduled" ? (
                    <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 bg-yellow-400/15 text-yellow-400 rounded-full">
                      <CalendarBlank size={10} weight="light" />
                      예약 {msg.scheduledAt}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 bg-green-400/15 text-green-400 rounded-full">
                      발송완료
                    </span>
                  )}
                  <span className="text-[10px] text-[#9ca3af]">
                    {msg.status === "sent" ? msg.sentAt : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
