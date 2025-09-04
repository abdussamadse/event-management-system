"use client";

import { useEventStore } from "@/stores/eventStore";
import { Event } from "@/types/event";
import { Calendar, MapPin } from "lucide-react";

interface EventDetailsProps {
  params: {
    id: string;
  };
}

export default function EventDetails({ params }: EventDetailsProps) {
  const events: Event[] = useEventStore((state) => state.events);
  const event = events.find((e) => e.id === params.id);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-gray-500 text-center text-lg">Event not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Title and Category */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-5xl font-extrabold text-gray-900">{event.title}</h1>
        <span className="inline-block bg-orange-100 text-orange-600 font-medium px-4 py-2 rounded-full text-lg">
          {event.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-lg mb-8">{event.description}</p>

      <hr className="border-gray-200 mb-8" />

      {/* Event Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-800 text-lg">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-orange-500" />
          <span>
            {new Date(event.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-orange-500" />
          <span>{event.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold">Category:</span>
          <span>{event.category}</span>
        </div>
      </div>
    </div>
  );
}
