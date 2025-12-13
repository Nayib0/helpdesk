"use client";

import axios from "axios";
import { useState } from "react";

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
  reload: () => void;
  userId: string;
  onCreated: (ticket: any) => void;
}

export default function CreateTicketModal({
  open,
  onClose,
  reload,
  userId,
  onCreated,
}: CreateTicketModalProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const [error, setError] = useState("");

  const create = async () => {
    setError("");

    if (!form.title.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    if (!form.description.trim()) {
      setError("La descripción es obligatoria.");
      return;
    }

    const newTicket = {
      ...form,
      createdBy: userId,
      createdAt: new Date().toISOString(),
      status: "open",
      comments: [],
    };

    const res = await axios.post("http://localhost:4000/tickets", newTicket);

    onCreated(res.data);
    reload();
    onClose();

    setForm({
      title: "",
      description: "",
      priority: "medium",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-gray-100 w-full max-w-sm rounded-lg shadow-2xl border-4 border-gray-400 overflow-hidden">
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 border-b-2 border-blue-900">
          <h2 className="text-lg font-bold uppercase tracking-wide">
            SUBMIT NEW TICKET
          </h2>
          <button
            className="text-white hover:text-red-300 font-extrabold text-xl cursor-pointer"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <div className="p-6">
          {error && (
            <p className="text-red-600 text-sm mb-3 font-bold p-2 bg-red-100 border border-red-500 rounded-md">
              {error}
            </p>
          )}

          <input
            className="w-full p-2 mb-2 rounded-md bg-white border-2 border-gray-400 shadow-inner text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="w-full p-2 mb-2 rounded-md bg-white border-2 border-gray-400 shadow-inner text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            className="w-full p-2 mb-4 rounded-md bg-white border-2 border-gray-400 shadow-sm text-gray-800 cursor-pointer focus:border-blue-500 focus:ring-1 focus:ring-blue-300 cursor-pointer"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">Priority: Low</option>
            <option value="medium">Priority: Medium</option>
            <option value="high">Priority: High</option>
          </select>

          <button
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 border-b-4 border-blue-900 hover:border-blue-700 active:border-b-0 active:translate-y-0.5 shadow-md w-full py-2 rounded-md text-white font-extrabold uppercase tracking-wider transition-all cursor-pointer"
            onClick={create}
          >
            SUBMIT TICKET
          </button>

          <button
            className="mt-2 w-full py-2 rounded-md bg-gray-300 hover:bg-gray-400 border-b-4 border-gray-500 hover:border-gray-400 active:border-b-0 active:translate-y-0.5 shadow-md text-gray-900 font-extrabold uppercase transition-all cursor-pointer"
            onClick={onClose}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
