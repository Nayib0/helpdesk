"use client";

import axios from "axios";
import { Ticket } from "@/types/ticket";


interface ViewTicketModalProps {
  open: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  reload: () => void;
}

export default function ViewTicketModal({ open, onClose, ticket, reload }: ViewTicketModalProps) {
  if (!open || !ticket) return null;

  const updateStatus = async (newStatus: string) => {
    await axios.put(`/api/tickets?id=${ticket.id}`, {
      status: newStatus,
    });

    reload();     
    onClose();    
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-neutral-900 p-6 rounded w-96">
        <h2 className="text-xl mb-3">{ticket.title}</h2>

        <p className="opacity-80">{ticket.description}</p>

        <div className="mt-2">
          <span className="text-blue-400">Prioridad:</span> {ticket.priority}
        </div>
        <div>
          <span className="text-blue-400">Estado:</span> {ticket.status}
        </div>

        <div className="mt-4 grid gap-2">
          {ticket.status !== "in_progress" && (
            <button
              className="bg-yellow-600 w-full py-2 rounded"
              onClick={() => updateStatus("in_progress")}
            >
              Marcar en progreso
            </button>
          )}

          {ticket.status !== "closed" && (
            <button
              className="bg-green-600 w-full py-2 rounded"
              onClick={() => updateStatus("closed")}
            >
              Cerrar Ticket
            </button>
          )}
        </div>

        <button className="mt-4 w-full py-2" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
