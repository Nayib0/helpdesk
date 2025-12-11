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
    const res = await axios.get(`http://localhost:4000/tickets?createdBy=${userId}`);
    setTickets(res.data);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Tus Tickets</h1>

        <button
          onClick={() => setOpenCreate(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear Ticket
        </button>
      </div>

      <div className="grid gap-3">
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

      <CreateTicketModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        reload={loadTickets}
        userId={userId}
        onCreated={(newTicket) => setTickets([newTicket, ...tickets])}
      />

      <ViewTicketModal
        open={openView}
        onClose={() => setOpenView(false)}
        ticket={selected}
        reload={loadTickets}
      />
    </div>
  );
}
