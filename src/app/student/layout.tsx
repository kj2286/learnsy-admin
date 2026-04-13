"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  MagnifyingGlass,
  ClipboardText,
  Question,
  EnvelopeSimple,
  ArrowSquareOut,
} from "@phosphor-icons/react";

const menuItems = [
  { label: "대시보드", href: "/student/dashboard", icon: House },
  { label: "강사 찾기", href: "/student/discover", icon: MagnifyingGlass },
  { label: "과제", href: "/student/assignments", icon: ClipboardText },
  { label: "질문", href: "/student/questions", icon: Question },
  { label: "메시지", href: "/student/messages", icon: EnvelopeSimple },
];

function StudentTopNav() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center h-14 px-6">
        <Link
          href="/student/dashboard"
          className="text-lg font-bold text-gray-900 tracking-tight mr-8 flex-shrink-0"
        >
          Learnsy
        </Link>
        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded mr-6 flex-shrink-0">
          학생
        </span>
        <nav className="flex items-center gap-0.5 overflow-x-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
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
          <Link
            href="/admin"
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors"
          >
            관리자 <ArrowSquareOut size={12} weight="light" />
          </Link>
          <span className="text-xs text-gray-600 font-medium">이하은</span>
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
    <div className="flex flex-col h-full bg-gray-50 text-gray-900">
      <StudentTopNav />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
