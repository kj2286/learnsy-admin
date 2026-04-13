import TopNav from "@/components/teacher/TopNav";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full bg-gray-50 text-gray-900">
      <TopNav />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
