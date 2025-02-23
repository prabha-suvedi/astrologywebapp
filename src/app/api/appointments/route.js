import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB(); // Ensure database connection
    return NextResponse.json({ message: "MongoDB Connected Successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect to MongoDB" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB(); // Ensure database connection

    const body = await req.json(); // Parse the request body
    console.log("Received Data:", body); // Debugging output

    return NextResponse.json({ message: "Appointment created successfully", data: body });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}
