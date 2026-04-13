"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  ChalkboardTeacher,
  ChatCircle,
  EnvelopeSimple,
  ClipboardText,
  CreditCard,
  User,
  SignOut,
  ArrowSquareOut,
} from "@phosphor-icons/react";

const menuItems = [
  { label: "대시보드", href: "/manager/dashboard", icon: House },
  { label: "담당 강사", href: "/manager/teachers", icon: ChalkboardTeacher },
  { label: "상담 내역", href: "/manager/consultations", icon: ChatCircle },
  { label: "메시지 관리", href: "/manager/messages", icon: EnvelopeSimple },
  { label: "과제 확인", href: "/manager/assignments", icon: ClipboardText },
  { label: "구독 현황", href: "/manager/subscriptions", icon: CreditCard },
];

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="flex h-screen bg-[#0f1117] text-[#e4e4e7]">
      {/* Sidebar */}
      <aside className="w-60 bg-[#161923] border-r border-[#2a2d3e] flex flex-col flex-shrink-0">
        <div className="h-14 px-4 flex items-center border-b border-[#2a2d3e]">
          <div>
            <span className="text-sm font-bold text-white">내신인강</span>
            <span className="text-[10px] text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded ml-2">학습매니저</span>
          </div>
        </div>

        <div className="px-3 py-3 border-b border-[#2a2d3e]">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-[#1c1f2e]">
            <div className="w-8 h-8 rounded-full bg-green-400/15 flex items-center justify-center">
              <User size={14} weight="light" className="text-green-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-white">홍매니저</p>
              <p className="text-[10px] text-[#9ca3af]">hong@learnsy.kr</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 mx-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-green-400/10 text-green-400"
                    : "text-[#9ca3af] hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} weight="light" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#2a2d3e] p-3 space-y-1">
          <a
            href="https://math-biseo.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#9ca3af] hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowSquareOut size={14} weight="light" />
            학생 사이트 ↗
          </a>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#9ca3af] hover:text-white hover:bg-white/5 transition-colors"
          >
            <SignOut size={14} weight="light" />
            로그아웃
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
