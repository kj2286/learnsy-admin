"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Megaphone,
  Question,
  ChatCircle,
} from "@phosphor-icons/react";

const menuItems = [
  { label: "공지사항 관리", href: "/teacher/notices", icon: Megaphone },
  { label: "질문 관리", href: "/teacher/questions", icon: Question },
  { label: "채팅 관리", href: "/teacher/chat", icon: ChatCircle },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center h-14 px-6">
        <Link href="/teacher" className="text-lg font-bold text-gray-900 tracking-tight mr-10">
          Learnsy
        </Link>
        <nav className="flex items-center gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} weight="light" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
