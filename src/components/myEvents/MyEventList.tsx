"use client";

import { useEffect } from "react";
import { useEventStore } from "@/stores/eventStore";
import MyEventCard from "./MyEventCard";
import { Event } from "@/types/event";

export default function MyEvents() {
  const fetchEvents = useEventStore((s) => s.fetchEvents);
  const loading = useEventStore((s) => s.loading);
  const error = useEventStore((s) => s.error);
  const events = useEventStore((s) => s.events);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Only show current user's events
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const myEvents: Event[] = userId
    ? events.filter((event) => event.userId === userId)
    : [];

  if (loading) return <p className="text-gray-500">Loading your events...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!myEvents.length)
    return <p className="text-gray-500">You have no events yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {myEvents.map((event) => (
        <MyEventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
