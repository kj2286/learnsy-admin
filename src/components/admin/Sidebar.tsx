"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  CreditCard,
  ChartLine,
  ShoppingBag,
  GraduationCap,
  Ticket,
  Robot,
  Megaphone,
  Users,
  BookOpen,
  Package,
  Book,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { mockTeachers } from "@/data/mock-teachers";

const commonMenuItems = [
  { label: "내 계정", href: "/admin/account", icon: User },
  { label: "결제 내역", href: "/admin/payments", icon: CreditCard },
  { label: "매출 (기간별)", href: "/admin/sales-period", icon: ChartLine },
  { label: "매출 (상품별)", href: "/admin/sales-product", icon: ShoppingBag },
  { label: "강의 부여", href: "/admin/assign-course", icon: GraduationCap },
  { label: "쿠폰 발급", href: "/admin/coupons", icon: Ticket },
  { label: "AI 피드백", href: "/admin/ai-feedback", icon: Robot },
  { label: "마케팅 어드민", href: "/admin/marketing", icon: Megaphone },
];

const teacherSubMenus = [
  { label: "수강 관리", suffix: "students", icon: Users },
  { label: "학생 정보", suffix: "student-info", icon: BookOpen },
  { label: "강의 등록", suffix: "courses", icon: GraduationCap },
];

const bookMenuItems = [
  { label: "배송 관리", href: "/admin/shipping", icon: Package },
  { label: "책 등록", href: "/admin/books", icon: Book },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className={`flex flex-col bg-admin-sidebar border-r border-admin-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* 로고 */}
      <div className="flex items-center h-14 px-4 border-b border-admin-border">
        {!collapsed && (
          <span className="text-lg font-bold text-white tracking-tight">
            Learnsy
          </span>
        )}
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 overflow-y-auto py-3">
        {/* 공통 메뉴 */}
        <div className="mb-4">
          {!collapsed && (
            <p className="px-4 mb-1 text-[11px] font-semibold text-admin-text-muted uppercase tracking-wider">
              공통
            </p>
          )}
          {commonMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-admin-accent/10 text-admin-accent border-r-2 border-admin-accent"
                    : "text-admin-text-muted hover:text-admin-text hover:bg-white/5"
                }`}
              >
                <Icon size={18} weight="light" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* 강사별 메뉴 */}
        {mockTeachers.map((teacher) => (
          <div key={teacher.id} className="mb-3">
            {!collapsed && (
              <p className="px-4 mb-1 text-[11px] font-semibold text-admin-text-muted uppercase tracking-wider">
                {teacher.name}
              </p>
            )}
            {teacherSubMenus.map((sub) => {
              const href = `/admin/teachers/${teacher.id}/${sub.suffix}`;
              const Icon = sub.icon;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                    isActive(href)
                      ? "bg-admin-accent/10 text-admin-accent border-r-2 border-admin-accent"
                      : "text-admin-text-muted hover:text-admin-text hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} weight="light" />
                  {!collapsed && <span>{sub.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}

        {/* 도서 판매 */}
        <div className="mb-3">
          {!collapsed && (
            <p className="px-4 mb-1 text-[11px] font-semibold text-admin-text-muted uppercase tracking-wider">
              도서 판매
            </p>
          )}
          {bookMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-admin-accent/10 text-admin-accent border-r-2 border-admin-accent"
                    : "text-admin-text-muted hover:text-admin-text hover:bg-white/5"
                }`}
              >
                <Icon size={18} weight="light" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 접기/펼치기 */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center gap-2 h-10 border-t border-admin-border text-admin-text-muted hover:text-admin-text transition-colors text-sm"
      >
        {collapsed ? (
          <CaretRight size={16} weight="bold" />
        ) : (
          <>
            <CaretLeft size={16} weight="bold" />
            <span>숨기기</span>
          </>
        )}
      </button>
    </aside>
  );
}
