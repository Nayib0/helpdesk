"use client";

import axios from "axios";
import { useState } from "react";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { setUser } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading("Iniciando sesión...");

    try {
      const res = await axios.get(
        `http://localhost:4000/users?email=${form.email}`
      );

      const user = res.data[0];

      if (!user) {
        toast.error("User not found", { id: loadingToast });
        setLoading(false);
        return;
      }

      if (user.password !== form.password) {
        toast.error("Incorrect password", { id: loadingToast });
        setLoading(false);
        return;
      }

      toast.success(`Welcome, ${user.name}!`, { id: loadingToast });

      setUser(user);

      setTimeout(() => {
        router.push(`/${user.role}`);
      }, 500);
    } catch (error: unknown) {
      console.error(error);

      toast.error("Error logging in", { id: loadingToast });
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-900 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl overflow-hidden rounded-xl border-4 border-blue-500 shadow-2xl shadow-blue-800/50">
        <div className="flex items-center justify-center p-8 md:p-12 bg-gray-200">
          <form className="w-full max-w-md space-y-6" onSubmit={login}>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-gray-800">
                <span className="text-blue-600">HELP</span>DESK
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="user@ticket.com"
                  className="w-full p-3 border-2 border-gray-400 bg-white shadow-inner rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  className="w-full p-3 border-2 border-gray-400 bg-white shadow-inner rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-extrabold py-3 rounded-md transition-all uppercase tracking-wider cursor-pointer
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 border-b-4 border-blue-900 hover:border-blue-700 active:border-b-0 active:translate-y-0.5 shadow-lg"
                  }`}
              >
                {loading ? "ACCESSING..." : "ACCESS SYSTEM"}
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-300 border-2 border-blue-500 rounded-md shadow-md text-xs">
              <p className="font-extrabold mb-1 text-blue-700">
                TEST MODE ACTIVE
              </p>
              <p className="text-gray-800">
                Agent ID:{" "}
                <strong className="text-blue-600">agent@example.com</strong> /{" "}
                <strong className="text-blue-600">agent1234</strong>
              </p>
              <p className="text-gray-800">
                Client ID:{" "}
                <strong className="text-blue-600">client@example.com</strong> /{" "}
                <strong className="text-blue-600">client1234</strong>
              </p>
            </div>
          </form>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center bg-gray-800 p-8">
          <h1 className="text-5xl font-extrabold text-green-400 mb-4 tracking-widest animate-pulse"></h1>
          <p className="text-lg text-green-300 font-mono italic">
            {"> Initializing secure connection..."}
          </p>
          <div className="w-full h-4 bg-gray-900 border border-green-400 mt-4 overflow-hidden">
            <div className="bg-green-600 h-full w-3/4 animate-none transition-all"></div>
          </div>
          <p className="text-sm text-gray-500 font-mono mt-1">Conecting</p>
        </div>
      </div>
    </div>
  );
}
