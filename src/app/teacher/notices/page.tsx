"use client";

import { useState } from "react";
import { PencilSimple, Trash, File } from "@phosphor-icons/react";
import { mockNotices } from "@/data/mock-notices";

export default function NoticesPage() {
  const [notices] = useState(mockNotices);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">공지사항 관리</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <PencilSimple size={16} weight="light" />
          공지사항 작성
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">작성일</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">제목</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">내용</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">파일</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">관리</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">삭제</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {notices.map((notice) => (
              <tr key={notice.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{notice.createdAt}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{notice.title}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{notice.content}</td>
                <td className="px-4 py-3">
                  {notice.file && (
                    <span className="flex items-center gap-1 text-blue-600 text-xs">
                      <File size={14} weight="light" />
                      {notice.file}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button className="px-3 py-1 text-xs text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors">
                    수정
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1 text-red-400 hover:text-red-600 transition-colors">
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
