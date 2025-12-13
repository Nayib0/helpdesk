"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "@/components/TicketCard";
import CreateTicketModal from "@/components/CreateTicketModal";
import ViewTicketModal from "@/components/ViewTicketModal";
import { Ticket } from "@/types/ticket";
import toast from "react-hot-toast";
import { useAuth } from "@/store/auth";

export default function ClientDashboard() {
const { user } = useAuth();
 const [tickets, setTickets] = useState<Ticket[]>([]);
 const [openCreate, setOpenCreate] = useState(false);
 const [openView, setOpenView] = useState(false);
 const [selected, setSelected] = useState<Ticket | null>(null);

 const userId = user?.id || "CLIENT_ID_TEMPORAL";

 const loadTickets = async () => {
  try {
   const res = await axios.get(
    `http://localhost:4000/tickets?createdBy=${userId}`
   );
   setTickets(res.data);
  } catch (error) {
   toast.error("Error al cargar tus tickets");
   console.error(error);
  }
 };

 useEffect(() => {
  loadTickets();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 const handleTicketCreated = (newTicket: Ticket) => {
  setTickets([newTicket, ...tickets]);
  toast.success("Ticket created succesfully", {
   duration: 3000,
  });
 };

 return (
  <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-xl border-4 border-gray-400 mt-5">
   <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-t-md shadow-inner border-b-4 border-blue-900">
    <h1 className="text-2xl font-bold tracking-wide">Client Console</h1>

    <button
     onClick={() => setOpenCreate(true)}
     className="bg-gradient-to-b from-green-400 to-green-600 text-gray-900 font-extrabold px-4 py-2 rounded-full shadow-md border-2 border-green-700 hover:brightness-110 active:scale-95 transition-all uppercase text-sm cursor-pointer"
    >
     NEW TICKET
    </button>
   </div>

   {/* Listado de Tickets: Fondo ligeramente contrastante */}
   <div className="grid gap-4 bg-gray-200 p-4 rounded-md border border-gray-400">
    {tickets.length === 0 && (
     <p className="opacity-80 text-center py-6 text-gray-600 italic border-2 border-dashed border-gray-400 p-4 rounded-lg">
      No tienes tickets registrados. Crea uno nuevo.
     </p>
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
        
   <CreateTicketModal
    open={openCreate}
    onClose={() => setOpenCreate(false)}
    reload={loadTickets}
    userId={userId}
    onCreated={handleTicketCreated}
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