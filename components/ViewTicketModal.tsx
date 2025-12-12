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
    await axios.patch(`http://localhost:4000/tickets/${ticket.id}`, {
      status: newStatus,
    });

    reload();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-200/50 flex justify-center items-center">
      <div className="bg-neutral-900 p-6  w-96 border border-neutral-700 rounded-2xl">
        
        <h2 className="text-2xl font-bold mb-3 text-white ">{ticket.title}</h2>

        <p className="opacity-90 text-xl text-white">{ticket.description}</p>

        <div className="mt-3 space-y-1 text-sm">
          <p className="text-white ml-3"><span className="text-blue-400 font-semibold">Status:</span> {ticket.status}</p>
          <p className="text-white ml-3"><span className="text-blue-400 font-semibold">Priority:</span> {ticket.priority}</p>
          <p className="text-white ml-3"><span className="text-blue-400 font-semibold">Created by:</span> {ticket.createdBy}</p>
          <p className="text-white ml-3"><span className="text-blue-400 font-semibold">Date:</span> {new Date(ticket.createdAt).toLocaleString()}</p>
        </div>

        <div className="mt-4 grid gap-2">

          {ticket.status !== "open" && (
            <button
              className="bg-green-600 w-full py-2 rounded text-white cursor-pointer hover:bg-green-400"
              onClick={() => updateStatus("open")}
            >
              Mark as Open
            </button>
          )}

          {ticket.status !== "in_progress" && (
            <button
              className="bg-yellow-600 w-full py-2 rounded text-white cursor-pointer hover:bg-yellow-400"
              onClick={() => updateStatus("in_progress")}
            >
              Mark in Progress
            </button>
          )}

          {ticket.status !== "closed" && (
            <button
              className="bg-red-600 w-full py-2 rounded text-white cursor-pointer hover:bg-red-400"
              onClick={() => updateStatus("closed")}
            >
              Mark as Closed
            </button>
          )}

        </div>

        <button
          className="mt-4 w-full py-2 rounded bg-neutral-700 hover:bg-neutral-500 cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>

      </div>
    </div>
  );
}
