interface BadgeProps {
  text: string;
  type?: "success" | "warning" | "danger" | "info" | "neutral";
}

const colors = {
  success: "bg-green-600 text-white",
  warning: "bg-yellow-500 text-black",
  danger: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
  neutral: "bg-neutral-700 text-white",
};

export default function Badge({ text, type = "neutral" }: BadgeProps) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded font-semibold ${colors[type]}`}
    >
      {text}
    </span>
  );
}
