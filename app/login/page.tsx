"use client";

import axios from "axios";
import { useState } from "react";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { setUser } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.get(
        `http://localhost:4000/users?email=${form.email}`
      );

      const user = res.data[0];

      if (!user) {
        setError("User not found");
        return;
      }

      if (user.password !== form.password) {
        setError("Incorrect password");
        return;
      }

      setUser(user);
      router.push(`/${user.role}`);

    } catch (error) {
      console.log(error);
      setError("Server error");
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        
      "
    >
      {/* subtle dark overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

      <div
        className="
          relative z-10
          w-[820px] h-[480px]
          grid grid-cols-2
          rounded-2xl overflow-hidden
          shadow-[0_0_40px_rgba(0,0,0,0.45)]
          bg-white/10 backdrop-blur-xl
        "
      >
        {/* LEFT PANEL */}
        <div className="flex items-center justify-center bg-white/60 backdrop-blur-xl p-10">
          <form
            onSubmit={login}
            className="w-[85%] space-y-6"
          >
            <h1
              className="
                text-3xl font-extrabold text-[#2E74FF]
                drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]
                text-center
              "
            >
              Welcome Back
            </h1>

            <div className="space-y-1">
              <label className="text-sm text-black font-semibold">
                Email
              </label>
              <input
                type="text"
                value={form.email}
                placeholder="example@hotmail.com"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="
                  w-full p-3 rounded-lg bg-white/80
                  border border-[#9bb4e1]
                  focus:ring-2 focus:ring-[#5EB3F6]
                  focus:outline-none
                  shadow-inner
                "
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-black font-semibold">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                placeholder="********"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="
                  w-full p-3 rounded-lg bg-white/80
                  border border-[#9bb4e1]
                  focus:ring-2 focus:ring-[#5EB3F6]
                  focus:outline-none
                  shadow-inner
                "
              />
            </div>

            {error && (
              <p className="text-red-600 text-center font-bold text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="
                w-full py-3 rounded-xl font-semibold text-white 
                bg-gradient-to-b from-[#6FB1FC] to-[#3A7BD5]
                shadow-[0_4px_10px_rgba(0,0,0,0.25)]
                hover:brightness-110 active:scale-95 transition-all
              "
            >
              Sign In
            </button>
          </form>
        </div>

        {/* RIGHT PANEL – “Windows Vista Glow” */}
        <div
          className="
            relative flex items-center justify-center
            bg-gradient-to-br from-[#4D9FFF]/70 to-[#3A5CD5]/70
          "
        >
         

          <div className="relative z-10 text-center">
            <h2 className="text-white text-2xl font-bold drop-shadow-xl">
              HelpDesk System
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
