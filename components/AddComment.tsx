"use client";

import axios from "axios";
import { useState } from "react";
import { Ticket } from "@/types/ticket";

interface Props {
  ticket: Ticket;
  reload: () => void;
}

export default function AddComment({ ticket, reload }: Props) {
  const [comment, setComment] = useState("");

  const addComment = async () => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      user: "Agent 2",
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
    <div className="mt-4 border-t border-gray-300 pt-4">
      <textarea
        className="w-full p-2 rounded-md bg-white border-2 border-gray-400 shadow-inner text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition-all"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 border-b-4 border-blue-900 hover:border-blue-700 active:border-b-0 active:translate-y-0.5 shadow-md w-full py-2 rounded-md mt-2 text-white font-extrabold uppercase tracking-wider transition-all cursor-pointer cursor-pointer"
        onClick={addComment}
      >
        Add comment
      </button>
    </div>
  );
}
