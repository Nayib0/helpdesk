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

  const create = async () => {
    const res = await axios.post("http://localhost:4000/tickets", {
      ...form,
      createdBy: userId,
    });

    onCreated(res.data);
    reload();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-neutral-900 p-6 rounded w-96">
        <h2 className="text-xl mb-4">Nuevo Ticket</h2>

        <input
          className="w-full p-2 mb-2 rounded bg-neutral-800"
          placeholder="Título"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full p-2 mb-2 rounded bg-neutral-800"
          placeholder="Descripción"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full p-2 mb-2 rounded bg-neutral-800"
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>

        <button className="bg-blue-600 w-full py-2 rounded" onClick={create}>
          Crear
        </button>

        <button className="mt-2 w-full py-1" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
