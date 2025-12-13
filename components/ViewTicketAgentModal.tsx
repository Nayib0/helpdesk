"use client";

import axios from "axios";
import { useState } from "react";
import { Ticket } from "@/types/ticket";

interface Props {
  open: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  reload: () => void;
}

export default function ViewTicketAgentModal({
  open,
  onClose,
  ticket,
  reload,
}: Props) {
  const [comment, setComment] = useState("");

  if (!open || !ticket) return null;

  const updateStatus = async (newStatus: string) => {
    await axios.patch(`http://localhost:4000/tickets/${ticket.id}`, {
      status: newStatus,
    });

    reload();
    onClose();
  };

  const addComment = async () => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      user: "Agent 1",
      text: comment,
      createdAt: new Date().toISOString(),
    };

    await axios.patch(`http://localhost:4000/tickets/${ticket.id}`, {
      comments: [...(ticket.comments || []), newComment],
    });

    setComment("");
    reload();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center p-4">
      {/* Contenedor Principal: Estilo de ventana de diálogo de sistema */}
      <div className="bg-gray-100 w-full max-w-lg rounded-lg shadow-2xl border-4 border-gray-400 overflow-hidden">
        {/* Header: Barra de título de la ventana */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 border-b-2 border-blue-900">
          <h2 className="text-lg font-bold uppercase tracking-wide justify-center flex w-full">
            TICKET 
          </h2>
          <button
            className="text-white hover:text-red-300 font-extrabold text-xl cursor-pointer"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-3 mb-4 p-4 bg-white border-2 border-gray-300 rounded-md shadow-inner text-gray-800">
            <h3 className="text-xl font-extrabold text-blue-700 border-b border-gray-300 pb-1">
              {ticket.title}
            </h3>
            <p className="text-sm italic"> Description: {ticket.description}</p>

            <p className="text-sm">
              <span className="font-bold text-gray-700">Status:</span>{" "}
              <span className="uppercase">{ticket.status}</span>
            </p>
            <p className="text-sm">
              <span className="font-bold text-gray-700">Priority:</span>{" "}
              <span className="uppercase">{ticket.priority}</span>
            </p>
            <p className="text-sm">
              <span className="font-bold text-gray-700">Created by:</span>{" "}
              {ticket.createdBy}
            </p>
            <p className="text-xs text-gray-500">
              <span className="font-bold">Date:</span>{" "}
              {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="border-t border-gray-300 pt-4 mb-4">
            <h3 className="font-bold text-lg mb-2 text-gray-800 uppercase tracking-wider">
              Update Status
            </h3>
            <div className="flex gap-3">
              <button
                className="px-3 py-1 bg-gradient-to-b from-green-400 to-green-600 text-gray-900 font-bold rounded-md shadow-md border-b-2 border-green-700 active:border-b active:translate-y-0.5 transition-all text-sm uppercase cursor-pointer"
                onClick={() => updateStatus("open")}
              >
                Open
              </button>

              <button
                className="px-3 py-1 bg-gradient-to-b from-yellow-400 to-yellow-600 text-gray-900 font-bold rounded-md shadow-md border-b-2 border-yellow-700 active:border-b active:translate-y-0.5 transition-all text-sm uppercase cursor-pointer"
                onClick={() => updateStatus("in_progress")}
              >
                In Progress
              </button>

              <button
                className="px-3 py-1 bg-gradient-to-b from-red-400 to-red-600 text-gray-900 font-bold rounded-md shadow-md border-b-2 border-red-700 active:border-b active:translate-y-0.5 transition-all text-sm uppercase cursor-pointer"
                onClick={() => updateStatus("closed")}
              >
                Close
              </button>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-4">
            <h3 className="font-bold text-lg mb-2 text-gray-800 uppercase tracking-wider">
              Comments 
            </h3>

            <div className="space-y-3 max-h-40 overflow-y-auto mb-3 bg-gray-200 p-3 rounded-md border-2 border-gray-300 shadow-inner">
              {(ticket.comments || []).length === 0 && (
                <p className="text-sm italic text-gray-600">No comments yet</p>
              )}

              {(ticket.comments || []).map((c) => (
                <div
                  key={c.id}
                  className="bg-white p-2 rounded-sm border border-gray-300 text-sm"
                >
                  <p className="font-extrabold text-blue-700">{c.user}</p>
                  <p className="text-gray-800">{c.text}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <textarea
              className="w-full p-2 rounded-md bg-white border-2 border-gray-400 shadow-inner text-gray-800 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 border-b-4 border-blue-900 hover:border-blue-700 active:border-b-0 active:translate-y-0.5 shadow-md py-2 rounded-md text-white font-extrabold uppercase tracking-wider transition-all cursor-pointer"
              onClick={addComment}
            >
              Add comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
