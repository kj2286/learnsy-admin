"use client";

import { useState } from "react";
import { mockShipping } from "@/data/mock-shipping";
import FilterBar from "@/components/admin/FilterBar";
import DataTable, { Column } from "@/components/admin/DataTable";
import SearchInput from "@/components/shared/SearchInput";
import Dropdown from "@/components/shared/Dropdown";
import DatePicker from "@/components/shared/DatePicker";
import type { Shipping } from "@/types";

const partnerOptions = [
  { value: "", label: "전체 파트너사" },
  { value: "학원 직배송", label: "학원 직배송" },
  { value: "출판사 직송", label: "출판사 직송" },
];

const columns: Column<Shipping>[] = [
  { key: "registeredDate", label: "등록날짜" },
  { key: "deliveryPartner", label: "배송파트너사" },
  { key: "deliveryName", label: "배송명" },
  { key: "ordererName", label: "주문자이름" },
  { key: "email", label: "이메일" },
  { key: "phone", label: "연락처" },
  { key: "address", label: "주소" },
  { key: "detailAddress", label: "상세주소" },
  { key: "zipCode", label: "우편번호" },
  {
    key: "trackingNumber",
    label: "송장번호",
    render: (item) =>
      item.trackingNumber ? (
        <span>{item.trackingNumber}</span>
      ) : (
        <span className="text-red-400 text-xs">미입력</span>
      ),
  },
  { key: "deliveryCompany", label: "배송업체" },
];

export default function ShippingPage() {
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchOrder, setSearchOrder] = useState("");
  const [searchTracking, setSearchTracking] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [partner, setPartner] = useState("");
  const [checkEmptyTracking, setCheckEmptyTracking] = useState(false);
  const [checkOrderNumber, setCheckOrderNumber] = useState(false);

  const filtered = mockShipping.filter((s) => {
    if (searchName && !s.ordererName.includes(searchName)) return false;
    if (searchPhone && !s.phone.includes(searchPhone)) return false;
    if (searchOrder && !s.id.includes(searchOrder)) return false;
    if (searchTracking && !s.trackingNumber.includes(searchTracking)) return false;
    if (startDate && s.registeredDate < startDate) return false;
    if (endDate && s.registeredDate > endDate) return false;
    if (partner && s.deliveryPartner !== partner) return false;
    if (checkEmptyTracking && s.trackingNumber !== "") return false;
    return true;
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-admin-text mb-6">배송 관리</h1>

      <FilterBar>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-admin-text-muted">이름</span>
          <SearchInput placeholder="이름 검색..." value={searchName} onChange={setSearchName} className="w-32" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-admin-text-muted">연락처</span>
          <SearchInput placeholder="연락처 검색..." value={searchPhone} onChange={setSearchPhone} className="w-36" />
        </div>
        <div className="flex items-end gap-1">
          <DatePicker label="시작일" value={startDate} onChange={setStartDate} className="w-36" />
          <span className="text-admin-text-muted mb-2">~</span>
          <DatePicker label="종료일" value={endDate} onChange={setEndDate} className="w-36" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-admin-text-muted">주문번호</span>
          <SearchInput placeholder="주문번호 검색..." value={searchOrder} onChange={setSearchOrder} className="w-36" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-admin-text-muted">송장번호</span>
          <SearchInput placeholder="송장번호 검색..." value={searchTracking} onChange={setSearchTracking} className="w-36" />
        </div>
        <Dropdown label="배송 파트너사" options={partnerOptions} value={partner} onChange={setPartner} className="w-40" />
      </FilterBar>

      {/* Checkbox filters */}
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={checkEmptyTracking}
            onChange={(e) => setCheckEmptyTracking(e.target.checked)}
            className="w-4 h-4 rounded accent-admin-accent"
          />
          <span className="text-sm text-admin-text">빈 송장번호 체크하기</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={checkOrderNumber}
            onChange={(e) => setCheckOrderNumber(e.target.checked)}
            className="w-4 h-4 rounded accent-admin-accent"
          />
          <span className="text-sm text-admin-text">주문번호 확인하기</span>
        </label>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(item) => item.id}
        emptyMessage="배송 데이터가 없습니다."
      />
    </div>
  );
}
