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
        bg-gray-500 
        border border-white/20 
        backdrop-blur-md 
        rounded-xl 
        cursor-pointer 
        transition
        hover:bg-gray-500/50
        hover:shadow-[0_0_15px_rgba(80,150,255,0.25)]
        flex flex-col gap-2 
      "
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl text-white drop-shadow-sm">
          {ticket.title}
        </h3>

        <Badge text={ticket.priority} color={priorityColor} />
      </div>

      <p className="text-sm text-white/90 ">
        {ticket.description}
      </p>

      <div className="flex justify-between items-center pt-1 border-t border-white/10">
        <Badge text={ticket.status} color={statusColor} />

        <span className="text-xs text-white">
          {new Date(ticket.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
