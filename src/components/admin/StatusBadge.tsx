interface StatusBadgeProps {
  status: string;
  variant?: "success" | "danger" | "warning" | "info" | "neutral";
}

const variantStyles = {
  success: "bg-green-500/15 text-green-400",
  danger: "bg-red-500/15 text-red-400",
  warning: "bg-yellow-500/15 text-yellow-400",
  info: "bg-blue-500/15 text-blue-400",
  neutral: "bg-gray-500/15 text-gray-400",
};

const statusVariantMap: Record<string, "success" | "danger" | "warning" | "info" | "neutral"> = {
  "성공": "success",
  "진행중": "success",
  "통과": "success",
  "활성": "success",
  "완료": "info",
  "실패": "danger",
  "퇴출": "danger",
  "비활성": "neutral",
  "대기": "warning",
  "일시정지": "warning",
  "미통과": "danger",
};

export default function StatusBadge({ status, variant }: StatusBadgeProps) {
  const resolvedVariant = variant || statusVariantMap[status] || "neutral";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[resolvedVariant]}`}>
      {status}
    </span>
  );
}
