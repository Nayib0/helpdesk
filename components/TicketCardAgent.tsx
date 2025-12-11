"use client";

import { Ticket } from "@/types/ticket";

export default function TicketCard({ ticket, onClick }: { ticket: Ticket; onClick: () => void }) {
  return (
    <div
      className="p-4 bg-neutral-800 rounded cursor-pointer hover:bg-neutral-700"
      onClick={onClick}
    >
      <h2 className="text-lg font-bold">{ticket.title}</h2>

      <p className="opacity-70">{ticket.description}</p>

      <div className="mt-2 text-sm">
        <span className="text-blue-400">Prioridad:</span> {ticket.priority}
      </div>

      <div className="text-sm">
        <span className="text-blue-400">Estado:</span> {ticket.status}
      </div>
    </div>
  );
}
