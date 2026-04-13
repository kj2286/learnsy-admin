"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  MagnifyingGlass,
  Question,
  ClipboardText,
  EnvelopeSimple,
  ChatCircle,
  SignOut,
} from "@phosphor-icons/react";

const menuItems = [
  { label: "대시보드", href: "/student/dashboard", icon: House },
  { label: "강사 찾기", href: "/student/discover", icon: MagnifyingGlass },
  { label: "질문", href: "/student/questions", icon: Question },
  { label: "과제", href: "/student/assignments", icon: ClipboardText },
  { label: "메시지", href: "/student/messages", icon: EnvelopeSimple },
];

function StudentTopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-[#F5F2EA] border-b border-[#1A1A18]/10">
      <div className="max-w-5xl mx-auto px-4 flex items-center h-14 gap-8">
        <Link
          href="/student/dashboard"
          className="text-base font-bold text-[#1A1A18] tracking-tight flex-shrink-0"
        >
          수학비서
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  active
                    ? "border-[#C9E535] text-[#1A1A18]"
                    : "border-transparent text-[#6B6B68] hover:text-[#1A1A18]"
                }`}
              >
                <Icon size={16} weight="light" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3 flex-shrink-0">
          <span className="text-sm font-medium text-[#1A1A18]">이하은</span>
          <button className="flex items-center gap-1 text-xs text-[#6B6B68] hover:text-[#1A1A18] transition-colors">
            <SignOut size={14} weight="light" />
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1A1A18]">
      <StudentTopNav />
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      <button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#C9E535] hover:bg-[#B3CC20] shadow-lg flex items-center justify-center transition-colors z-40"
        aria-label="질문하기"
      >
        <ChatCircle size={24} weight="light" className="text-[#1A1A18]" />
      </button>
    </div>
  );
}
