"use client";

import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="
        px-4 py-2
        bg-gradient-to-b from-[#e7ecf5] to-[#cfd7e4]
        text-[#2c3e55]
        font-semibold
        rounded-md
        border border-[#b8c2d3]
        shadow-[0_2px_4px_rgba(0,0,0,0.2)]
        hover:brightness-110
        active:scale-95
        transition-all
      "
    >
      Logout
    </button>
  );
}
