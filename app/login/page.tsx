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
        setError("Usuario no encontrado");
        return;
      }

      if (user.password !== form.password) {
        setError("Contraseña incorrecta");
        return;
      }

      setUser(user);

      router.push(`/${user.role}`);
    } catch (error) {
      console.log(error);
      setError("Error en el servidor");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 w-300 h-screen">
        <div className="flex items-center justify-center">
          <form 
            className="max-w-md mx-auto p-2 flex justify-center flex-col w-full"
            onSubmit={login}
          >
            <div className="mb-4 space-y-5">
              <label>Email</label>
              <input
                type="text"
                placeholder="example@example.com"
                className="w-full p-3 border rounded-lg"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full p-3 border rounded-lg"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              {error && (
                <p className="text-red-600 font-bold text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="bg-blue-600 w-full border p-3 rounded-xl text-white font-bold mt-4"
              >
                Sign-in
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center rounded-lg bg-blue-200"></div>
      </div>
    </div>
  );
}
