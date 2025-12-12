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

export default function ViewTicketAgentModal({ open, onClose, ticket, reload }: Props) {
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
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 text-white">
      <div className="bg-neutral-900 w-full max-w-lg p-6 rounded shadow-lg border border-neutral-700">

        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-xl font-bold">{ticket.title}</h2>
          <button className="text-red-400 text-xl cursor-pointer" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm opacity-80">{ticket.description}</p>

          <p><span className="font-bold text-blue-400">Status:</span> {ticket.status}</p>
          <p><span className="font-bold text-blue-400">Priority:</span> {ticket.priority}</p>
          <p><span className="font-bold text-blue-400">Created by:</span> {ticket.createdBy}</p>
          <p><span className="font-bold text-blue-400">Date:</span> {new Date(ticket.createdAt).toLocaleString()}</p>
        </div>

        <hr className="border-neutral-700 my-3" />
        <div className="flex flex-col items-center"> 

        <h3 className="font-bold text-lg mb-2">Manage status</h3>
        <div className="flex gap-2 mb-4">
          <button
            className="px-3 py-1 bg-green-600 rounded text-white text-sm cursor-pointer"
            onClick={() => updateStatus("open")}
          >
            Open
          </button>

          <button
            className="px-3 py-1 bg-yellow-600 rounded text-white text-sm cursor-pointer"
            onClick={() => updateStatus("in_progress")}
          >
            In Progress
          </button>

          <button
            className="px-3 py-1 bg-red-600 rounded text-white text-sm cursor-pointer"
            onClick={() => updateStatus("closed")}
          >
            Close
          </button>
        </div>
        </div>

        <hr className="border-neutral-700 my-3" />

        <h3 className="font-bold text-lg mb-2">Comments</h3>

        <div className="space-y-2 max-h-40 overflow-y-auto mb-3 bg-neutral-800 p-2 rounded">
          {(ticket.comments || []).length === 0 && (
            <p className="text-sm opacity-70">No comments yet</p>
          )}

          {(ticket.comments || []).map((c) => (
            <div key={c.id} className="bg-neutral-700 p-2 rounded text-sm">
              <p className="font-bold">{c.user}</p>
              <p>{c.text}</p>
              <p className="opacity-60 text-xs mt-1">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <textarea
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-sm"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          className="mt-2 w-full bg-blue-600 py-2 rounded text-white cursor-pointer hover:bg-blue-400"
          onClick={addComment}
        >
          Add comment
        </button>

      </div>
    </div>
  );
}
