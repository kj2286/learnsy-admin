"use client";

import { Plus } from "@phosphor-icons/react";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";

interface Book {
  id: string;
  title: string;
  price: number;
  publisher: string;
  registeredAt: string;
  status: "활성" | "비활성";
}

const mockBooks: Book[] = [
  { id: "b1", title: "PREP 수학 개념편", price: 25000, publisher: "포스트매스출판", registeredAt: "2025-01-10", status: "활성" },
  { id: "b2", title: "PREP 수학 유형편", price: 28000, publisher: "포스트매스출판", registeredAt: "2025-01-10", status: "활성" },
  { id: "b3", title: "PREP 기출문제집", price: 22000, publisher: "포스트매스출판", registeredAt: "2025-03-01", status: "활성" },
  { id: "b4", title: "수능 실전 모의고사집", price: 18000, publisher: "포스트매스출판", registeredAt: "2025-04-15", status: "비활성" },
];

const columns: Column<Book>[] = [
  { key: "title", label: "교재명" },
  {
    key: "price",
    label: "가격",
    render: (item) => `₩${item.price.toLocaleString()}`,
  },
  { key: "publisher", label: "출판사" },
  { key: "registeredAt", label: "등록일" },
  {
    key: "status",
    label: "상태",
    render: (item) => <StatusBadge status={item.status} />,
  },
];

export default function BooksPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-admin-text">책 등록</h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-admin-accent text-white text-sm font-medium hover:bg-admin-accent/90 transition-colors">
          <Plus size={15} weight="bold" />
          책 추가하기
        </button>
      </div>

      <DataTable
        columns={columns}
        data={mockBooks}
        keyExtractor={(item) => item.id}
        emptyMessage="등록된 교재가 없습니다."
      />
    </div>
  );
}
