"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  VideoCamera,
  Question,
  CheckSquare,
  Users,
  ChatCircle,
  EnvelopeSimple,
  ChartBar,
  SignOut,
  ArrowRight,
} from "@phosphor-icons/react";

const menuItems = [
  { label: "대시보드", href: "/teacher/dashboard", icon: House },
  { label: "콘텐츠", href: "/teacher/content", icon: VideoCamera },
  { label: "질문 관리", href: "/teacher/questions", icon: Question },
  { label: "채점 관리", href: "/teacher/grading", icon: CheckSquare },
  { label: "학생 관리", href: "/teacher/students", icon: Users },
  { label: "채팅", href: "/teacher/chat", icon: ChatCircle },
  { label: "메시지", href: "/teacher/messages", icon: EnvelopeSimple },
  { label: "리포트", href: "/teacher/reports", icon: ChartBar },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="bg-[#F5F2EA] border-b border-[#1A1A18]/10">
      <div className="flex items-center h-14 px-6">
        <Link href="/teacher/dashboard" className="flex flex-col mr-8 flex-shrink-0">
          <span className="text-base font-bold text-[#1A1A18] leading-tight tracking-tight" style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}>수학비서</span>
          <span className="text-[10px] text-[#6B6B68] leading-none">선생님</span>
        </Link>

        <nav className="flex items-center gap-0 overflow-x-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 h-14 text-xs font-medium transition-colors whitespace-nowrap border-b-2 ${
                  active
                    ? "border-[#C9E535] text-[#1A1A18]"
                    : "border-transparent text-[#6B6B68] hover:text-[#1A1A18]"
                }`}
              >
                <Icon size={15} weight="light" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 flex-shrink-0">
          <span className="text-xs font-medium text-[#1A1A18]">김수학 선생님</span>
          <button className="flex items-center gap-1 text-xs text-[#6B6B68] hover:text-[#1A1A18] transition-colors">
            <SignOut size={14} weight="light" />
            로그아웃
          </button>
          <Link href="/admin" className="flex items-center gap-1 text-xs text-[#6B6B68] hover:text-[#1A1A18] transition-colors border border-[#1A1A18]/10 rounded-md px-2 py-1">
            관리자
            <ArrowRight size={12} weight="light" />
          </Link>
        </div>
      </div>
    </header>
  );
}
