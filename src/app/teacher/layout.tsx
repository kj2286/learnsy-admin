import TopNav from "@/components/teacher/TopNav";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-[#F5F2EA] text-[#1A1A18]"
      style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}
    >
      <TopNav />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
