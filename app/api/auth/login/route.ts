import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await axios.get(
    `http://localhost:4000/users?email=${email}&password=${password}`
  );

  const users = res.data;

  if (users.length === 0) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const user = users[0];

  const response = NextResponse.json({
    message: "Logged in",
    user
  });

  response.cookies.set("user", JSON.stringify(user), {
    httpOnly: false,
    path: "/"
  });

  return response;
}
