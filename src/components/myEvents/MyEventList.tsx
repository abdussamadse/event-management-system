"use client";

import { useEffect } from "react";
import { useEventStore } from "@/stores/eventStore";
import MyEventCard from "./MyEventCard";
import { Event } from "@/types/event";
import MyEventCardSkeleton from "./MyEventCardSkeleton";

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

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <MyEventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

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
