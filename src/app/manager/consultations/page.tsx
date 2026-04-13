"use client";

import { useState } from "react";
import {
  ChatCircle,
  PaperPlaneTilt,
  CaretDown,
  CaretUp,
  Warning,
} from "@phosphor-icons/react";

interface Message {
  id: string;
  sender: "teacher" | "student" | "manager";
  senderName: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  teacherName: string;
  studentName: string;
  lastMessage: string;
  lastTimestamp: string;
  messages: Message[];
}

const teacherStudentConversations: Conversation[] = [
  {
    id: "ts1",
    teacherName: "김수학",
    studentName: "이하은",
    lastMessage: "3강 오늘 꼭 들어보세요! 미분 파트 중요해요.",
    lastTimestamp: "2026-04-10 09:15",
    messages: [
      { id: "m1", sender: "student", senderName: "이하은", content: "선생님, 2강 극한 파트가 잘 이해가 안 돼요.", timestamp: "2026-04-10 08:40" },
      { id: "m2", sender: "teacher", senderName: "김수학", content: "어느 부분이 특히 어렵나요? 수열의 극한 쪽인가요?", timestamp: "2026-04-10 08:55" },
      { id: "m3", sender: "student", senderName: "이하은", content: "네, lim 기호 사용하는 부분이요.", timestamp: "2026-04-10 09:00" },
      { id: "m4", sender: "teacher", senderName: "김수학", content: "3강 오늘 꼭 들어보세요! 미분 파트 중요해요.", timestamp: "2026-04-10 09:15" },
    ],
  },
  {
    id: "ts2",
    teacherName: "김수학",
    studentName: "김민수",
    lastMessage: "이번 주 문제풀이 세트 내일까지 제출해주세요.",
    lastTimestamp: "2026-04-09 20:30",
    messages: [
      { id: "m1", sender: "teacher", senderName: "김수학", content: "민수야, 진도가 잘 나가고 있어요. 계속 유지해봐요.", timestamp: "2026-04-09 18:00" },
      { id: "m2", sender: "student", senderName: "김민수", content: "네 선생님! 다음 강의도 재밌을 것 같아요.", timestamp: "2026-04-09 19:45" },
      { id: "m3", sender: "teacher", senderName: "김수학", content: "이번 주 문제풀이 세트 내일까지 제출해주세요.", timestamp: "2026-04-09 20:30" },
    ],
  },
  {
    id: "ts3",
    teacherName: "박미적",
    studentName: "정현우",
    lastMessage: "적분 기본 정리 다시 한 번 복습해두세요.",
    lastTimestamp: "2026-04-08 16:20",
    messages: [
      { id: "m1", sender: "student", senderName: "정현우", content: "선생님, 치환적분이 너무 어려워요...", timestamp: "2026-04-08 15:00" },
      { id: "m2", sender: "teacher", senderName: "박미적", content: "천천히 따라오면 돼요. 어떤 예제가 막히나요?", timestamp: "2026-04-08 15:30" },
      { id: "m3", sender: "student", senderName: "정현우", content: "3번 문제 풀이 방식을 잘 모르겠어요.", timestamp: "2026-04-08 15:50" },
      { id: "m4", sender: "teacher", senderName: "박미적", content: "적분 기본 정리 다시 한 번 복습해두세요.", timestamp: "2026-04-08 16:20" },
    ],
  },
];

const managerStudentConversations: Conversation[] = [
  {
    id: "ms1",
    teacherName: "홍매니저",
    studentName: "박서연",
    lastMessage: "혹시 어려운 부분이 있으면 선생님께 질문해봐요!",
    lastTimestamp: "2026-04-09 10:30",
    messages: [
      { id: "m1", sender: "manager", senderName: "홍매니저", content: "서연아, 지난주보다 학습량이 줄었어요. 혹시 어려운 부분이 있으면 선생님께 질문해봐요!", timestamp: "2026-04-09 10:30" },
      { id: "m2", sender: "student", senderName: "박서연", content: "네, 최근에 시험 기간이라 바빴어요. 이번 주부터 다시 열심히 할게요!", timestamp: "2026-04-09 11:00" },
    ],
  },
  {
    id: "ms2",
    teacherName: "홍매니저",
    studentName: "김민수",
    lastMessage: "잘하고 있어요! 이 페이스 유지해봐요.",
    lastTimestamp: "2026-04-09 18:00",
    messages: [
      { id: "m1", sender: "manager", senderName: "홍매니저", content: "민수야, 이번 주 꾸준히 강의 듣고 있구나!", timestamp: "2026-04-09 18:00" },
      { id: "m2", sender: "student", senderName: "김민수", content: "감사합니다! 중간고사 잘 볼 수 있을 것 같아요.", timestamp: "2026-04-09 18:30" },
      { id: "m3", sender: "manager", senderName: "홍매니저", content: "잘하고 있어요! 이 페이스 유지해봐요.", timestamp: "2026-04-09 18:45" },
    ],
  },
  {
    id: "ms3",
    teacherName: "장매니저",
    studentName: "오태양",
    lastMessage: "1강 마저 들어보는 건 어떨까요?",
    lastTimestamp: "2026-04-10 07:30",
    messages: [
      { id: "m1", sender: "manager", senderName: "장매니저", content: "태양아, 1강을 50%까지 들었네요. 오늘 마저 들어보는 건 어떨까요?", timestamp: "2026-04-10 07:30" },
    ],
  },
];

function ConversationItem({
  conv,
  isManagerTab,
}: {
  conv: Conversation;
  isManagerTab: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [interventionText, setInterventionText] = useState("");
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-400/15 flex items-center justify-center flex-shrink-0">
            <ChatCircle size={16} weight="light" className="text-green-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">
                {isManagerTab ? conv.teacherName : conv.teacherName}
              </span>
              <span className="text-xs text-[#9ca3af]">↔</span>
              <span className="text-sm font-medium text-white">{conv.studentName}</span>
            </div>
            <p className="text-xs text-[#9ca3af] mt-0.5 line-clamp-1">{conv.lastMessage}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-[#9ca3af]">{conv.lastTimestamp}</span>
          {expanded ? (
            <CaretUp size={14} weight="light" className="text-[#9ca3af]" />
          ) : (
            <CaretDown size={14} weight="light" className="text-[#9ca3af]" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[#2a2d3e]">
          {/* Messages */}
          <div className="px-5 py-4 space-y-3 max-h-80 overflow-y-auto">
            {conv.messages.map((msg) => {
              const isRight =
                msg.sender === "teacher" || msg.sender === "manager";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-1 ${isRight ? "items-end" : "items-start"}`}
                >
                  <span className="text-[10px] text-[#9ca3af]">
                    {msg.senderName} · {msg.timestamp}
                  </span>
                  <div
                    className={`max-w-[70%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isRight
                        ? "bg-green-400/20 text-green-100 rounded-br-sm"
                        : "bg-[#2a2d3e] text-[#e4e4e7] rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Intervention (teacher-student tab only) */}
          {!isManagerTab && (
            <div className="px-5 pb-4">
              <div className="bg-[#2a2d3e] rounded-xl p-3">
                <p className="text-xs text-yellow-400 flex items-center gap-1.5 mb-2">
                  <Warning size={12} weight="fill" />
                  개입하기 — 매니저로서 메시지를 추가할 수 있습니다
                </p>
                <textarea
                  value={interventionText}
                  onChange={(e) => setInterventionText(e.target.value)}
                  placeholder="개입 메시지를 입력하세요..."
                  rows={2}
                  className="w-full bg-[#0f1117] border border-[#3a3d4e] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] placeholder-[#9ca3af] resize-none focus:outline-none focus:border-green-400/50"
                />
                <div className="flex justify-end mt-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-xs rounded-lg transition-colors">
                    <PaperPlaneTilt size={12} weight="light" />
                    개입 메시지 전송
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* New Message (manager-student tab) */}
          {isManagerTab && (
            <div className="px-5 pb-4">
              <div className="flex gap-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  rows={2}
                  className="flex-1 bg-[#2a2d3e] border border-[#3a3d4e] rounded-lg px-3 py-2 text-sm text-[#e4e4e7] placeholder-[#9ca3af] resize-none focus:outline-none focus:border-green-400/50"
                />
                <button className="flex-shrink-0 px-3 py-2 bg-green-400/20 hover:bg-green-400/30 text-green-400 rounded-lg transition-colors self-end">
                  <PaperPlaneTilt size={16} weight="light" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState<"teacher" | "manager">("teacher");

  const conversations =
    activeTab === "teacher"
      ? teacherStudentConversations
      : managerStudentConversations;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">상담 내역</h1>
        <p className="text-sm text-[#9ca3af] mt-1">
          선생님↔학생, 매니저↔학생 상담 내역을 확인하고 개입할 수 있습니다
        </p>
      </div>

      {/* Notice */}
      <div className="mb-4 px-4 py-2.5 bg-blue-400/10 border border-blue-400/20 rounded-lg flex items-center gap-2">
        <Warning size={14} weight="light" className="text-blue-400 flex-shrink-0" />
        <p className="text-xs text-blue-300">
          선생님은 학습매니저↔학생 상담내역을 볼 수 있고 개입 가능합니다
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2a2d3e] mb-5">
        {(["teacher", "manager"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? "text-green-400"
                : "text-[#9ca3af] hover:text-white"
            }`}
          >
            {tab === "teacher" ? "선생님↔학생" : "매니저↔학생"}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Conversation List */}
      <div className="space-y-3">
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conv={conv}
            isManagerTab={activeTab === "manager"}
          />
        ))}
      </div>
    </div>
  );
}
