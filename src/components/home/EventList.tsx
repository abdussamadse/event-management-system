"use client";

import { useEventStore } from "@/stores/eventStore";
import { useFilteredEvents } from "@/hooks/useFilteredEvents";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import { useEffect } from "react";

export default function EventList() {
  const fetchEvents = useEventStore((s) => s.fetchEvents);
  const loading = useEventStore((s) => s.loading);
  const error = useEventStore((s) => s.error);
  const events = useFilteredEvents();

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Render loading state
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Render error or empty state
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!events.length) return <p className="text-gray-500">No events found.</p>;

  return (
    <>
      <h2 className="text-xl font-bold">Upcoming Events</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
}
