"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Megaphone,
  Question,
  ChatCircle,
  CheckSquare,
  VideoCamera,
  Users,
  EnvelopeSimple,
  ChartBar,
  ArrowSquareOut,
} from "@phosphor-icons/react";

const menuItems = [
  { label: "대시보드", href: "/teacher/dashboard", icon: House },
  { label: "콘텐츠", href: "/teacher/content", icon: VideoCamera },
  { label: "공지사항", href: "/teacher/notices", icon: Megaphone },
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
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center h-14 px-6">
        <Link href="/teacher/dashboard" className="text-lg font-bold text-gray-900 tracking-tight mr-8 flex-shrink-0">
          Learnsy
        </Link>
        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded mr-6 flex-shrink-0">선생님</span>
        <nav className="flex items-center gap-0.5 overflow-x-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon size={16} weight="light" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3 flex-shrink-0">
          <a
            href="https://coding-sage-alpha.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors"
          >
            학생사이트 <ArrowSquareOut size={12} weight="light" />
          </a>
          <Link href="/admin" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
            관리자 →
          </Link>
          <span className="text-xs text-gray-600 font-medium">김수학 선생님</span>
        </div>
      </div>
    </header>
  );
}
