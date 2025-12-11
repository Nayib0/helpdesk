"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TicketCard from "@/components/TicketCard";
import ViewAgentTicketModal from "@/components/ViewTicketAgentModal"
import { Ticket } from "@/types/ticket";



export default function AgentDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [selected, setSelected] = useState<Ticket | null>(null);

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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Panel del Agente</h1>

      <div className="flex gap-3 mb-4">
        <select
          className="bg-neutral-800 p-2 rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="open">Abiertos</option>
          <option value="in_progress">En progreso</option>
          <option value="closed">Cerrados</option>
        </select>

        <select
          className="bg-neutral-800 p-2 rounded"
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">Cualquier prioridad</option>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>

        <input
          className="bg-neutral-800 p-2 rounded flex-1"
          placeholder="Buscar ticket..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
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
    </div>
  );
}
