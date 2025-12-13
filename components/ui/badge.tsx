import React from "react";

interface BadgeProps {
 text: string;
 color?: "green" | "red" | "yellow" | "blue" | "gray";
}

export default function Badge({ text, color = "gray" }: BadgeProps) {
 const colors: Record<string, string> = {
  green: "bg-green-300 text-green-900 border-green-500 shadow-sm",
  
  red: "bg-red-300 text-red-900 border-red-500 shadow-sm",
  
  yellow: "bg-yellow-300 text-yellow-900 border-yellow-500 shadow-sm",
  
  blue: "bg-blue-300 text-blue-900 border-blue-500 shadow-sm",
  
  gray: "bg-gray-300 text-gray-800 border-gray-500 shadow-sm",
 };

 return (
  <span
   className={`px-2 py-0.5 text-xs font-bold rounded-sm border-2 ${colors[color]} uppercase tracking-wider`}
  >
   {text}
  </span>
 );
}