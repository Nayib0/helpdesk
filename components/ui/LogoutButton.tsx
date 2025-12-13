"use client";

import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function LogoutButton() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    toast.error("Logged out successfully");
    logout();
    setTimeout(() => {
      router.push("/login");
    }, 200);
  };

  if (!mounted || !user) return null;

  return (
    <div className="fixed top-6 right-4 z-50 bg-gray-100 rounded-md shadow-lg px-4 py-2 border-2 border-gray-400 flex items-center gap-5">
      <div className="text-sm">
        <p className="font-extrabold text-gray-800 tracking-wide">
          {user.name}
        </p>
        <p className="text-xs text-gray-600 capitalize italic">
          Access Level: {user.role}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 border-b-4 border-red-900 hover:border-red-700 active:border-b-0 active:translate-y-0.5 shadow-md text-white font-extrabold px-4 py-2 rounded-md transition-all uppercase text-sm cursor-pointer"
      >
        LOGOUT
      </button>
    </div>
  );
}
