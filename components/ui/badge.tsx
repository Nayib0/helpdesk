import React from "react";

interface BadgeProps {
  text: string;
  color?: "green" | "red" | "yellow" | "blue" | "gray";
}

export default function Badge({ text, color = "gray" }: BadgeProps) {
  const colors: Record<string, string> = {
    green: "bg-green-600/20 text-green-400 border-green-600",
    red: "bg-red-600/20 text-red-400 border-red-600",
    yellow: "bg-yellow-600/20 text-yellow-300 border-yellow-600",
    blue: "bg-blue-600/20 text-blue-400 border-blue-600",
    gray: "bg-neutral-700 text-neutral-300 border-neutral-600",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded border ${colors[color]} uppercase tracking-wide`}
    >
      {text}
    </span>
  );
}
