"use client";

import axios from "axios";
import { Ticket } from "@/types/ticket";

interface ViewTicketModalProps {
  open: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  reload: () => void;
}

export default function ViewTicketModal({
  open,
  onClose,
  ticket,
  reload,
}: ViewTicketModalProps) {
  if (!open || !ticket) return null;

  const updateStatus = async (newStatus: string) => {
    await axios.patch(`http://localhost:4000/tickets/${ticket.id}`, {
      status: newStatus,
    });

    reload();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center p-4">
      {/* Contenedor Principal: Estilo de ventana de diálogo de sistema */}
      <div className="bg-gray-100 w-full max-w-sm rounded-lg shadow-2xl border-4 border-gray-400 overflow-hidden">
        {/* Header: Barra de título de la ventana */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 border-b-2 border-blue-900">
          <h2 className="text-lg font-bold uppercase tracking-wide">
            TICKET DETAIL
          </h2>
          <button
            className="text-white hover:text-red-300 font-extrabold text-xl cursor-pointer"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6">
          <h2 className="text-xl font-extrabold mb-3 text-gray-800 border-b border-gray-300 pb-1">
            {ticket.title}
          </h2>

          <p className="text-gray-700 mb-4">{ticket.description}</p>

          <div className="mt-3 space-y-1 text-sm p-3 bg-white border-2 border-gray-300 rounded-md shadow-inner">
            <p className="text-gray-800">
              <span className="text-blue-600 font-bold">Status:</span>{" "}
              <span className="uppercase">{ticket.status}</span>
            </p>
            <p className="text-gray-800">
              <span className="text-blue-600 font-bold">Priority:</span>{" "}
              <span className="uppercase">{ticket.priority}</span>
            </p>
            <p className="text-gray-800">
              <span className="text-blue-600 font-bold">Created by:</span>{" "}
              {ticket.createdBy}
            </p>
            <p className="text-gray-600 text-xs">
              <span className="font-bold">Date:</span>{" "}
              {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-4 grid gap-2 border-t border-gray-300 pt-4">
            <p className="text-sm font-bold text-gray-800 uppercase tracking-wider">
              Change Status
            </p>

            {ticket.status !== "open" && (
              <button
                // Botón 3D con color vibrante
                className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 border-b-4 border-green-700 hover:border-green-500 active:border-b-0 active:translate-y-0.5 shadow-md w-full py-2 rounded-md text-gray-900 font-bold transition-all uppercase text-sm cursor-pointer"
                onClick={() => updateStatus("open")}
              >
                Mark as Open
              </button>
            )}

            {ticket.status !== "in_progress" && (
              <button
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 border-b-4 border-yellow-700 hover:border-yellow-500 active:border-b-0 active:translate-y-0.5 shadow-md w-full py-2 rounded-md text-gray-900 font-bold transition-all uppercase text-sm cursor-pointer"
                onClick={() => updateStatus("in_progress")}
              >
                Mark in Progress
              </button>
            )}

            {ticket.status !== "closed" && (
              <button
                className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 border-b-4 border-red-700 hover:border-red-500 active:border-b-0 active:translate-y-0.5 shadow-md w-full py-2 rounded-md text-gray-900 font-bold transition-all uppercase text-sm cursor-pointer"
                onClick={() => updateStatus("closed")}
              >
                Mark as Closed
              </button>
            )}
          </div>

          <button
            className="mt-4 w-full py-2 rounded-md bg-gray-300 hover:bg-gray-400 border-b-4 border-gray-500 hover:border-gray-400 active:border-b-0 active:translate-y-0.5 shadow-md text-gray-900 font-extrabold uppercase transition-all"
            onClick={onClose}
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
