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
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-neutral-900 p-6 rounded w-96 border border-neutral-700">
        
        <h2 className="text-xl font-bold mb-4 text-white">New ticket</h2>

        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}

        <input
          className="w-full p-2 mb-2 rounded bg-neutral-800 border border-neutral-700 text-gray-100"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full p-2 mb-2 rounded bg-neutral-800 border border-neutral-700 text-gray-100"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full p-2 mb-3 rounded bg-neutral-800 border border-neutral-700 text-gray-100"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          className="bg-blue-600 w-full py-2 rounded .text-white hover:bg-blue-400 cursor-pointer text-white"
          onClick={create}
        >
          Create
        </button>

        <button
          className="mt-2 w-full py-2 rounded bg-neutral-700 hover:bg-neutral-500 cursor-pointer text-white"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>
      
    </div>
  );
}
