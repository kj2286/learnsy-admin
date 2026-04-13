"use client";

import { Megaphone } from "@phosphor-icons/react";

export default function MarketingPage() {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <Megaphone size={48} weight="light" className="text-admin-text-muted mb-4" />
      <h1 className="text-xl font-semibold text-admin-text mb-2">마케팅 어드민</h1>
      <p className="text-admin-text-muted text-sm">준비 중입니다</p>
    </div>
  );
}
