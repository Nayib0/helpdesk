import { Schema, model, models } from "mongoose";

const TicketSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    status: { type: String, enum: ["open", "in_progress", "closed"], default: "open" },

    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true, collection: "tickets" }
);

export const Ticket = models.Ticket || model("Ticket", TicketSchema);
