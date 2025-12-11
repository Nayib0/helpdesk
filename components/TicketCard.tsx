"use client";

export default function TicketCard({ ticket, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-neutral-900 rounded cursor-pointer hover:bg-neutral-800"
    >
      <h3 className="text-lg font-semibold">{ticket.title}</h3>
      <p className="opacity-80">{ticket.description}</p>

      <div className="mt-2 text-sm">
        <span className="text-blue-400">Prioridad:</span> {ticket.priority}{" "}
        <span className="ml-4 text-blue-400">Estado:</span> {ticket.status}
      </div>
    </div>
  );
}
