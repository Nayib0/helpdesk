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
      ? "red"
      : ticket.priority === "medium"
      ? "yellow"
      : "green";

  const statusColor =
    ticket.status === "open"
      ? "blue"
      : ticket.status === "in_progress"
      ? "yellow"
      : "green";

  return (
    <div
      onClick={onClick}
      className="p-4 bg-neutral-900 border border-neutral-700 rounded cursor-pointer hover:bg-neutral-800 transition flex flex-col gap-2"
    >
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">{ticket.title}</h3>
        <Badge text={ticket.priority} color={priorityColor} />
      </div>

      <p className="text-sm opacity-80 line-clamp-2">{ticket.description}</p>

      <div className="flex justify-between items-center mt-2">
        <Badge text={ticket.status} color={statusColor} />

        <span className="text-xs opacity-60">
          {new Date(ticket.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
