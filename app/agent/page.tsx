"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TicketCard from "@/components/TicketCard";
import ViewAgentTicketModal from "@/components/ViewTicketAgentModal";
import CreateTicketModal from "@/components/CreateTicketModal";
import { Ticket } from "@/types/ticket";

export default function AgentDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [search, setSearch] = useState("");

  const loadTickets = async () => {
    const res = await axios.get("http://localhost:4000/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const filtered = tickets.filter((t) => {
    return (
      (statusFilter === "all" || t.status === statusFilter) &&
      (priorityFilter === "all" || t.priority === priorityFilter) &&
      (t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="p-6 max-w-5xl mx-auto rounded-lg bg-[#E9EEF5] shadow-lg border border-white">

      <div className="flex justify-between items-center mb-6">
        <h1
          className="text-3xl font-bold text-[#3A7BD5]
          bg-gradient-to-r from-[#5EB3F6] to-[#3A7BD5]
          text-white px-6 py-3 rounded-lg shadow-md"
        >
          Agent Panel
        </h1>

        <button
          onClick={() => setOpenCreate(true)}
          className="
            bg-[#3A7BD5] hover:bg-[#5EB3F6]
            text-white font-bold px-4 py-2 rounded-md 
            shadow-md border border-white cursor-pointer
            hover:brightness-110 active:scale-95
          "
        >
          + Create Ticket
        </button>
      </div>

      <div className="flex gap-3 mb-6">

        <select
          className="bg-white border border-[#d0d7e2] p-2 rounded-md shadow-sm text-neutral-700"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        <select
          className="bg-white border border-[#d0d7e2] p-2 rounded-md shadow-sm text-neutral-700"
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          className="flex-1 bg-white border border-[#d0d7e2] p-2 rounded-md shadow-sm text-neutral-700"
          placeholder="Search tickets..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((t) => (
          <TicketCard
            key={t.id}
            ticket={t}
            onClick={() => {
              setSelected(t);
              setViewOpen(true);
            }}
          />
        ))}
      </div>

      <ViewAgentTicketModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        ticket={selected}
        reload={loadTickets}
      />

      <CreateTicketModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        reload={loadTickets}
        userId="AGENT_ID_TEMPORAL"
        onCreated={(t) => setTickets([t, ...tickets])}
      />

    </div>
  );
}
