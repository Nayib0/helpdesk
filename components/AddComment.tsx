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
    <div className="mt-4">
      <textarea
        className="w-full p-2 bg-neutral-800 rounded"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        className="bg-blue-600 w-full py-2 rounded mt-2"
        onClick={addComment}
      >
        Add comment
      </button>
    </div>
  );
}
