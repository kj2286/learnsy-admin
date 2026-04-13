"use client";

import { useState } from "react";
import { PencilSimple, Trash, File } from "@phosphor-icons/react";
import { mockNotices } from "@/data/mock-notices";

export default function NoticesPage() {
  const [notices] = useState(mockNotices);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#1A1A18]">공지사항 관리</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#C9E535] text-[#1A1A18] rounded-lg text-sm font-medium hover:bg-[#B3CC20] transition-colors">
          <PencilSimple size={16} weight="light" />
          공지사항 작성
        </button>
      </div>

      <div className="bg-white border border-black/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F5F2EA] border-b border-black/10">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B6B68]">작성일</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B6B68]">제목</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B6B68]">내용</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B6B68]">파일</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B6B68]">관리</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B6B68]">삭제</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {notices.map((notice) => (
              <tr key={notice.id} className="hover:bg-[#F5F2EA]/50 transition-colors">
                <td className="px-4 py-3 text-[#6B6B68] whitespace-nowrap">{notice.createdAt}</td>
                <td className="px-4 py-3 text-[#1A1A18] font-medium">{notice.title}</td>
                <td className="px-4 py-3 text-[#6B6B68] max-w-xs truncate">{notice.content}</td>
                <td className="px-4 py-3">
                  {notice.file && (
                    <span className="flex items-center gap-1 text-[#6B6B68] text-xs">
                      <File size={14} weight="light" />
                      {notice.file}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button className="px-3 py-1 text-xs text-[#1A1A18] border border-black/10 rounded hover:bg-[#F5F2EA] transition-colors">
                    수정
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1 text-[#6B6B68] hover:text-red-500 transition-colors">
                    <Trash size={16} weight="light" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
