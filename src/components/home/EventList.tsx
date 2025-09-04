"use client";

import { useEventStore } from "@/stores/eventStore";
import EventCard from "./EventCard";
import Link from "next/link";
import { useMemo } from "react";

export default function EventList() {
  const { events, search, category } = useEventStore();

  // get filtered events based on search and category
  const filteredEvents = useMemo(() => {
    const tokens = search.toLowerCase().split(" ").filter(Boolean);
    return events.filter((e) => {
      const haystack =
        `${e.title} ${e.description} ${e.location} ${e.category}`.toLowerCase();
      const matchesTokens = tokens.every((t) => haystack.includes(t));
      const matchesCategory = category ? e.category === category : true;
      return matchesTokens && matchesCategory;
    });
  }, [events, search, category]);

  // Handle no events found
  if (!filteredEvents.length)
    return <p className="text-gray-500">No events found.</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredEvents.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          <EventCard event={event} />
        </Link>
      ))}
    </div>
  );
}
