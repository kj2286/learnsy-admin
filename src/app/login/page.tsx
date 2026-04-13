"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeSimple, ArrowRight } from "@phosphor-icons/react";

const ACCOUNTS: Record<string, { role: string; name: string; redirect: string }> = {
  "admin@learnsy.kr": { role: "관리자", name: "관리자", redirect: "/admin" },
  "hong@learnsy.kr": { role: "학습매니저", name: "홍매니저", redirect: "/manager/dashboard" },
  "jang@learnsy.kr": { role: "학습매니저", name: "장매니저", redirect: "/manager/dashboard" },
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const account = ACCOUNTS[email.trim().toLowerCase()];
    if (account) {
      router.push(account.redirect);
    } else {
      setError("등록되지 않은 이메일입니다. 관리자 또는 학습매니저 이메일로 로그인하세요.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">내신인강 관리자</h1>
          <p className="text-sm text-gray-400">이메일로 로그인하세요</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">이메일</label>
            <div className="relative">
              <EnvelopeSimple size={16} weight="light" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-3 bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            로그인
            <ArrowRight size={16} weight="light" />
          </button>
        </form>

        <div className="mt-8 p-4 bg-[#1c1f2e] border border-[#2a2d3e] rounded-xl">
          <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">테스트 계정</p>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>admin@learnsy.kr</span>
              <span className="text-blue-400">관리자</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>hong@learnsy.kr</span>
              <span className="text-green-400">학습매니저</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>jang@learnsy.kr</span>
              <span className="text-green-400">학습매니저</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
