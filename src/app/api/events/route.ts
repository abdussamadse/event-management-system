import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Event } from "@/types/event";

// Path to the JSON file
const filePath = path.join(process.cwd(), "src", "lib", "events.json");

// Function to read events from the JSON file
const readEvents = (): Event[] => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// GET /api/events
export async function GET() {
  const events = readEvents();
  return NextResponse.json(events);
}
