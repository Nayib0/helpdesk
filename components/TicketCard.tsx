"use client";

import Badge from "./ui/badge";
import { Ticket } from "@/types/ticket";

interface Props {
  ticket: Ticket;
  onClick: () => void;
}

export default function TicketCard({ ticket, onClick }: Props) {
  const priorityColor =
    ticket.priority === "high"
      ? "green"
      : ticket.priority === "medium"
      ? "yellow"
      : "red";

  const statusColor =
    ticket.status === "open"
      ? "green"
      : ticket.status === "in_progress"
      ? "yellow"
      : "red";

  return (
    <div
      onClick={onClick}
      className="
    p-4
    // Estilo 2003: Fondo gris claro, borde definido y sombra para dar profundidad
    bg-white 
    border-2 border-gray-400 
    rounded-md 
    shadow-md
    cursor-pointer 
    transition-all
    // Hover: Borde azul brillante para interacción 
    hover:border-blue-500
    hover:shadow-lg
    flex flex-col gap-2 
   "
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl text-gray-800">{ticket.title}</h3>

        <Badge text={ticket.priority} color={priorityColor} />
      </div>

      <p className="text-sm text-gray-700 ">{ticket.description}</p>

      <div className="flex justify-between items-center pt-2 border-t border-gray-300 mt-1">
        <Badge text={ticket.status} color={statusColor} />

        <span className="text-xs text-gray-600 italic">
          {new Date(ticket.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
