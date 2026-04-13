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
  ChalkboardTeacher,
  Package,
  Book,
  CaretLeft,
  CaretRight,
  VideoCamera,
  CreditCard as SubIcon,
  Buildings,
  ChartBar,
  UserCircleGear,
  ArrowSquareOut,
  SignOut,
} from "@phosphor-icons/react";

const commonMenuItems = [
  { label: "내 계정", href: "/admin/account", icon: User },
  { label: "결제 내역", href: "/admin/payments", icon: CreditCard },
  { label: "매출 (기간별)", href: "/admin/sales-period", icon: ChartLine },
  { label: "매출 (상품별)", href: "/admin/sales-product", icon: ShoppingBag },
  { label: "강사관리", href: "/admin/teacher-management", icon: ChalkboardTeacher },
  { label: "강의 부여", href: "/admin/assign-course", icon: GraduationCap },
  { label: "쿠폰 발급", href: "/admin/coupons", icon: Ticket },
  { label: "AI 피드백", href: "/admin/ai-feedback", icon: Robot },
  { label: "마케팅 어드민", href: "/admin/marketing", icon: Megaphone },
];

const bookMenuItems = [
  { label: "배송 관리", href: "/admin/shipping", icon: Package },
  { label: "책 등록", href: "/admin/books", icon: Book },
];

const platformMenuItems = [
  { label: "콘텐츠 관리", href: "/admin/content", icon: VideoCamera },
  { label: "구독 관리", href: "/admin/subscriptions", icon: SubIcon },
  { label: "학교 관리", href: "/admin/schools", icon: Buildings },
  { label: "리포트", href: "/admin/reports", icon: ChartBar },
  { label: "학습매니저", href: "/admin/manager", icon: UserCircleGear },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderMenuLink = (href: string, label: string, Icon: React.ComponentType<any>) => (
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
      {!collapsed && <span>{label}</span>}
    </Link>
  );

  const renderSectionLabel = (label: string) =>
    !collapsed ? (
      <p className="px-4 mb-1 text-[11px] font-semibold text-admin-text-muted uppercase tracking-wider">
        {label}
      </p>
    ) : null;

  return (
    <aside
      className={`flex flex-col bg-admin-sidebar border-r border-admin-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center h-14 px-4 border-b border-admin-border">
        {!collapsed && (
          <span className="text-lg font-bold text-white tracking-tight">
            내신인강 관리자
          </span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        <div className="mb-4">
          {renderSectionLabel("공통")}
          {commonMenuItems.map((item) => renderMenuLink(item.href, item.label, item.icon))}
        </div>

        <div className="mb-3">
          {renderSectionLabel("도서 판매")}
          {bookMenuItems.map((item) => renderMenuLink(item.href, item.label, item.icon))}
        </div>

        <div className="mb-3">
          {renderSectionLabel("내신인강 플랫폼")}
          {platformMenuItems.map((item) => renderMenuLink(item.href, item.label, item.icon))}
        </div>
      </nav>

      <div className="mb-3 px-4 pt-2 border-t border-admin-border">
        {renderSectionLabel("사이트 바로가기")}
        <a
          href="https://math-biseo.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 text-sm text-admin-text-muted hover:text-admin-text hover:bg-white/5 transition-colors -mx-4"
        >
          <ArrowSquareOut size={18} weight="light" />
          {!collapsed && <span>학생용 사이트 ↗</span>}
        </a>
        <a
          href="https://math-biseo.netlify.app/login"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 text-sm text-admin-text-muted hover:text-admin-text hover:bg-white/5 transition-colors -mx-4"
        >
          <ArrowSquareOut size={18} weight="light" />
          {!collapsed && <span>강사용 사이트 ↗</span>}
        </a>
      </div>

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 h-10 border-t border-admin-border text-admin-text-muted hover:text-red-400 transition-colors text-sm"
      >
        <SignOut size={16} weight="light" />
        {!collapsed && <span>로그아웃</span>}
      </Link>

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
