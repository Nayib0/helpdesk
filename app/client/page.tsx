"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "@/components/TicketCard";
import CreateTicketModal from "@/components/CreateTicketModal";
import ViewTicketModal from "@/components/ViewTicketModal";
import { Ticket } from "@/types/ticket";

export default function ClientDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selected, setSelected] = useState<Ticket | null>(null);

  const userId = "CLIENT_ID_TEMPORAL";

  const loadTickets = async () => {
    const res = await axios.get(
      `http://localhost:4000/tickets?createdBy=${userId}`
    );
    setTickets(res.data);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div
      className="
        p-6 max-w-4xl mx-auto
        bg-gray-400
        rounded-lg
        shadow-lg
        border border-w
      "
    >
      {/* Retro Header */}
      <div
        className="
          flex justify-between items-center mb-6
          bg-gradient-to-r from-[#5EB3F6] to-[#3A7BD5]
          text-white px-6 py-3 rounded-lg shadow-md
        "
      >
        <h1 className="text-2xl font-bold">Your Tickets</h1>

        <button
          onClick={() => setOpenCreate(true)}
          className="
            bg-gradient-to-b from-[#5EB3F6] to-[#3A7BD5]
            text-white font-semibold px-4 py-2 rounded shadow-md
            hover:brightness-110 active:scale-95 cursor-pointer
          "
        >
          Create Ticket
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4 bg-white-300">
        {tickets.length === 0 && (
            <p className="opacity-70 text-center py-6">You have no tickets.</p>
        )}

        {tickets.map((t) => (
          <TicketCard
            key={t.id}
            ticket={t}
            onClick={() => {
              setSelected(t);
              setOpenView(true);
            }}
          />
        ))}
      </div>

      {/* Create modal */}
      <CreateTicketModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        reload={loadTickets}
        userId={userId}
        onCreated={(newTicket) => setTickets([newTicket, ...tickets])}
      />

      {/* View details modal */}
      <ViewTicketModal
        open={openView}
        onClose={() => setOpenView(false)}
        ticket={selected}
        reload={loadTickets}
      />
    </div>
  );
}
