"use client";
import { useState, useEffect } from "react";
import MyEventCard from "./MyEventCard";
import { Event } from "@/types/event";

export default function MyEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const storedEvents: Event[] = JSON.parse(localStorage.getItem("myEvents") || "[]");
    setEvents(storedEvents);
  }, []);

  // Callback to remove deleted event from state
  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <MyEventCard key={event.id} event={event} onDelete={handleDelete} />
      ))}
    </div>
  );
}
