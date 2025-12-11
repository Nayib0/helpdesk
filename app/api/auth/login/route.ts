import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import { User } from "@/app/api/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    const { email, password } = await req.json();

console.log("🟢 FRONT ENVÍA:");
console.log("email:", `"${email}"`);
console.log("password:", `"${password}"`);


    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({
      message: "Logged in",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
