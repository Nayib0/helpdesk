import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL!;

if (!MONGO_URL) {
  throw new Error("❌ Missing MONGO_URL in .env.local");
}

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      // Ya está conectado
      return mongoose.connection;
    }

    const conn = await mongoose.connect(MONGO_URL);
    console.log("📌 MongoDB conectado:", conn.connection.name);

    return conn.connection;
  } catch (err) {
    console.error("❌ Error conectando a Mongo:", err);
    throw err;
  }
}
