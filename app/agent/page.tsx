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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="p-6 max-w-4xl mx-auto rounded-lg bg-gray-100 shadow-xl border-4 border-gray-400 mt-5">
      <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-t-md shadow-inner border-b-4 border-blue-900">
        <h1 className="text-2xl font-bold tracking-wide uppercase">
          Agent Console 
        </h1>

        <button
          onClick={() => setOpenCreate(true)}
          className="
      bg-gradient-to-b from-green-400 to-green-600 text-gray-900 font-extrabold px-4 py-2 rounded-full shadow-md border-2 border-green-700 hover:brightness-110 active:scale-95 transition-all uppercase text-sm
     cursor-pointer"
        >
          + NEW TICKET
        </button>
      </div>

      <div className="flex gap-3 mb-6 p-4 bg-gray-200 border border-gray-300 rounded-md shadow-inner">
        <select
          className="bg-white border-2 border-gray-400 p-2 rounded-md shadow-sm text-gray-800 cursor-pointer focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition-all"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Status: All</option>
          <option value="open">Status: Open</option>
          <option value="in_progress">Status: In Progress</option>
          <option value="closed">Status: Closed</option>
        </select>

        <select
          className="bg-white border-2 border-gray-400 p-2 rounded-md shadow-sm text-gray-800 cursor-pointer focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition-all"
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">Priority: All</option>
          <option value="low">Priority: Low</option>
          <option value="medium">Priority: Medium</option>
          <option value="high">Priority: High</option>
        </select>

        <input
          className="flex-1 bg-white border-2 border-gray-400 p-2 rounded-md shadow-inner text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition-all"
          placeholder="Search tickets by title or description..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 bg-white p-4 border border-gray-300 rounded-md shadow-inner">
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
