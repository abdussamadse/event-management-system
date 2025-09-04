import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Event } from "@/types/event";

// File path to events.json
const filePath = path.join(process.cwd(),"src", "lib", "events.json");

// Helper to read events from JSON
const readEvents = (): Event[] => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Helper to save events to JSON
const saveEvents = (events: Event[]) => {
  fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf-8");
};

// API Handlers

// GET /api/events
export async function GET() {
  const events = readEvents();
  return NextResponse.json(events);
}

// POST /api/events
export async function POST(req: NextRequest) {
  const body = await req.json();
  const events = readEvents();
  const newEvent: Event = { ...body, id: Date.now().toString() };
  events.push(newEvent);
  saveEvents(events);
  return NextResponse.json(newEvent);
}

// PUT /api/events
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const events = readEvents();
  const updatedEvents = events.map((ev) => (ev.id === body.id ? body : ev));
  saveEvents(updatedEvents);
  return NextResponse.json(body);
}

// DELETE /api/events?id=123
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });

  const events = readEvents();
  const updatedEvents = events.filter((ev) => ev.id !== id);
  saveEvents(updatedEvents);
  return NextResponse.json({ success: true });
}
