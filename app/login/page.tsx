"use client";

import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setError("");
      const res = await axios.post("/api/auth/login", form);
      setUser(res.data.user);

      router.push(`/${res.data.user.role}`);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Error");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Login</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value.toLowerCase().trim() })
        }
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value.trim() })}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={submit}
      >
        Login
      </button>
    </div>
  );
}
