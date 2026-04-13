"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { mockPlatformTeachers, mockPlatformStudents, mockLectures, mockSubscriptions, mockContents, mockSchools, mockManagers, mockReports, mockPlatformMessages } from "@/data/mock-platform";
import { mockNotices } from "@/data/mock-notices";
import { mockQuestions } from "@/data/mock-questions";
import { mockChatRooms, mockChatMessages } from "@/data/mock-chat";
import { mockCoupons } from "@/data/mock-coupons";
import { mockPayments } from "@/data/mock-payments";
import type { PlatformTeacher, PlatformStudent, Lecture, Subscription, Content, School, Manager, AnalysisReport, PlatformMessage } from "@/data/mock-platform";
import type { Notice } from "@/types";
import type { Question } from "@/types";

interface DataStore {
  // Platform data (shared across admin/teacher/student)
  teachers: PlatformTeacher[];
  students: PlatformStudent[];
  lectures: Lecture[];
  subscriptions: Subscription[];
  contents: Content[];
  schools: School[];
  managers: Manager[];
  reports: AnalysisReport[];
  platformMessages: PlatformMessage[];
  // Learnsy data
  notices: Notice[];
  questions: Question[];
  coupons: typeof mockCoupons;
  payments: typeof mockPayments;
  chatRooms: typeof mockChatRooms;
  chatMessages: typeof mockChatMessages;
  // Actions (admin controls)
  addNotice: (notice: Notice) => void;
  removeNotice: (id: string) => void;
  toggleQuestionStatus: (id: string) => void;
  addSubscription: (sub: Subscription) => void;
  cancelSubscription: (id: string) => void;
  sendMessage: (msg: PlatformMessage) => void;
  addContent: (content: Content) => void;
  removeContent: (id: string) => void;
}

const DataContext = createContext<DataStore | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [teachers] = useState(mockPlatformTeachers);
  const [students] = useState(mockPlatformStudents);
  const [lectures] = useState(mockLectures);
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [contents, setContents] = useState(mockContents);
  const [schools] = useState(mockSchools);
  const [managers] = useState(mockManagers);
  const [reports] = useState(mockReports);
  const [platformMessages, setPlatformMessages] = useState(mockPlatformMessages);
  const [notices, setNotices] = useState(mockNotices);
  const [questions, setQuestions] = useState(mockQuestions);
  const [coupons] = useState(mockCoupons);
  const [payments] = useState(mockPayments);
  const [chatRooms] = useState(mockChatRooms);
  const [chatMessages] = useState(mockChatMessages);

  const addNotice = (notice: Notice) => setNotices((prev) => [notice, ...prev]);
  const removeNotice = (id: string) => setNotices((prev) => prev.filter((n) => n.id !== id));
  const toggleQuestionStatus = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, status: q.status === "대기" ? "완료" as const : "대기" as const, answer: q.status === "대기" ? "답변이 등록되었습니다." : undefined }
          : q
      )
    );
  };
  const addSubscription = (sub: Subscription) => setSubscriptions((prev) => [...prev, sub]);
  const cancelSubscription = (id: string) => {
    setSubscriptions((prev) => prev.map((s) => s.id === id ? { ...s, status: "cancelled" as const } : s));
  };
  const sendMessage = (msg: PlatformMessage) => setPlatformMessages((prev) => [msg, ...prev]);
  const addContent = (content: Content) => setContents((prev) => [...prev, content]);
  const removeContent = (id: string) => setContents((prev) => prev.filter((c) => c.id !== id));

  return (
    <DataContext.Provider
      value={{
        teachers, students, lectures, subscriptions, contents, schools, managers, reports, platformMessages,
        notices, questions, coupons, payments, chatRooms, chatMessages,
        addNotice, removeNotice, toggleQuestionStatus, addSubscription, cancelSubscription, sendMessage, addContent, removeContent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
