"use client";

import { useState } from "react";
import { ArrowClockwise } from "@phosphor-icons/react";
import DataTable, { Column } from "@/components/admin/DataTable";
import FilterBar from "@/components/admin/FilterBar";
import StatusBadge from "@/components/admin/StatusBadge";
import DatePicker from "@/components/shared/DatePicker";
import Dropdown from "@/components/shared/Dropdown";
import { mockFeedback } from "@/data/mock-feedback";
import { mockCourses } from "@/data/mock-courses";
import type { AIFeedback } from "@/types";

const courseOptions = [
  { value: "", label: "전체 강의" },
  ...mockCourses.map((c) => ({ value: c.code, label: c.name })),
];

export default function AIFeedbackPage() {
  const [submitStart, setSubmitStart] = useState("");
  const [submitEnd, setSubmitEnd] = useState("");
  const [checkStart, setCheckStart] = useState("");
  const [checkEnd, setCheckEnd] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const filtered = mockFeedback.filter((f) => {
    const submitDate = f.submitDate.split(" ")[0];
    const checkDate = f.checkDate.split(" ")[0];

    if (submitStart && submitDate < submitStart) return false;
    if (submitEnd && submitDate > submitEnd) return false;
    if (checkStart && f.checkDate && checkDate < checkStart) return false;
    if (checkEnd && f.checkDate && checkDate > checkEnd) return false;
    if (courseFilter && f.courseCode !== courseFilter) return false;
    return true;
  });

  const columns: Column<AIFeedback>[] = [
    {
      key: "submitDate",
      label: "과제 제출일",
      render: (f) => <span className="text-admin-text-muted text-xs">{f.submitDate}</span>,
    },
    {
      key: "checkDate",
      label: "과제 검사일",
      render: (f) => (
        <span className="text-admin-text-muted text-xs">
          {f.checkDate || <span className="text-admin-text-muted/50">—</span>}
        </span>
      ),
    },
    {
      key: "status",
      label: "상태",
      render: (f) => <StatusBadge status={f.status} />,
    },
    {
      key: "courseCode",
      label: "강의코드",
      render: (f) => (
        <span className="font-mono text-xs text-admin-text">{f.courseCode}</span>
      ),
    },
    {
      key: "studentName",
      label: "이름",
      render: (f) => <span className="font-medium">{f.studentName}</span>,
    },
    {
      key: "assignmentLink",
      label: "과제 확인",
      render: (f) => (
        <a
          href={f.assignmentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-xs underline underline-offset-2 transition-colors"
        >
          과제 보기
        </a>
      ),
    },
    {
      key: "feedback",
      label: "과제 피드백",
      render: (f) => {
        if (f.feedbackGood.length === 0 && f.feedbackBad.length === 0) {
          return <span className="text-admin-text-muted/50 text-xs">검사 대기 중</span>;
        }
        return (
          <div className="space-y-2 py-1">
            {f.feedbackGood.length > 0 && (
              <div>
                <p className="text-xs font-medium text-green-400 mb-1">잘한점</p>
                <ol className="space-y-0.5 list-decimal list-inside">
                  {f.feedbackGood.map((item, i) => (
                    <li key={i} className="text-xs text-green-400/80 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {f.feedbackBad.length > 0 && (
              <div>
                <p className="text-xs font-medium text-red-400 mb-1">아쉬운점</p>
                <ol className="space-y-0.5 list-decimal list-inside">
                  {f.feedbackBad.map((item, i) => (
                    <li key={i} className="text-xs text-red-400/80 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-admin-text mb-6">AI 피드백</h1>

      <FilterBar>
        <div className="flex items-end gap-2">
          <DatePicker
            label="과제 제출일 (시작)"
            value={submitStart}
            onChange={setSubmitStart}
            className="w-40"
          />
          <span className="text-admin-text-muted pb-2">~</span>
          <DatePicker
            label="과제 제출일 (종료)"
            value={submitEnd}
            onChange={setSubmitEnd}
            className="w-40"
          />
        </div>

        <div className="flex items-end gap-2">
          <DatePicker
            label="과제 검사일 (시작)"
            value={checkStart}
            onChange={setCheckStart}
            className="w-40"
          />
          <span className="text-admin-text-muted pb-2">~</span>
          <DatePicker
            label="과제 검사일 (종료)"
            value={checkEnd}
            onChange={setCheckEnd}
            className="w-40"
          />
        </div>

        <Dropdown
          label="수강 강의"
          options={courseOptions}
          value={courseFilter}
          onChange={setCourseFilter}
          className="w-44"
        />

        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          className="self-end p-2 rounded-lg bg-admin-card border border-admin-border text-admin-text-muted hover:text-admin-text hover:border-admin-accent transition-colors"
          title="새로고침"
        >
          <ArrowClockwise size={16} weight="light" />
        </button>
      </FilterBar>

      <DataTable
        key={refreshKey}
        columns={columns}
        data={filtered}
        keyExtractor={(f) => f.id}
        emptyMessage="피드백 데이터가 없습니다."
      />
    </div>
  );
}
