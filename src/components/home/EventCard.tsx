"use client";

import { Event } from "@/types/event";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [attendees, setAttendees] = useState<number>(0);
  const [isAttending, setIsAttending] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const rsvps: Record<string, number> = JSON.parse(
      localStorage.getItem("rsvps") || "{}"
    );
    setAttendees(rsvps[event.id] || 0);

    // If RSVP count > 0, mark as attending (since we no longer track per user)
    setIsAttending((rsvps[event.id] || 0) > 0);
  }, [event.id]);

  const handleView = () => {
    router.push(`/events/${event.id}`);
  };

  const handleRSVP = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // ✅ prevent navigation on button click

    const rsvps: Record<string, number> = JSON.parse(
      localStorage.getItem("rsvps") || "{}"
    );

    if (isAttending) {
      // Cancel RSVP
      rsvps[event.id] = Math.max((rsvps[event.id] || 1) - 1, 0);
      localStorage.setItem("rsvps", JSON.stringify(rsvps));

      setIsAttending(false);
      setAttendees(rsvps[event.id]);
    } else {
      // Add RSVP
      rsvps[event.id] = (rsvps[event.id] || 0) + 1;
      localStorage.setItem("rsvps", JSON.stringify(rsvps));

      setIsAttending(true);
      setAttendees(rsvps[event.id]);
    }
  };

  return (
    <div
      onClick={handleView}
      className="border border-gray-200 p-6 rounded-2xl shadow-sm bg-white hover:shadow-xl hover:border-orange-500 hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
    >
      {/* Title */}
      <h3 className="font-bold text-xl text-gray-800 mb-2">{event.title}</h3>

      {/* Date */}
      <p className="text-gray-500 text-sm mb-1">
        {new Date(event.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Location */}
      <p className="text-gray-700 text-sm mb-3">{event.location}</p>

      {/* Category Badge */}
      <div className="flex items-center justify-between">
        <span
          className="
          inline-block
          bg-orange-100 text-orange-600
          text-xs font-medium
          px-3 py-1
          rounded-full
        "
        >
          {event.category}
        </span>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={handleRSVP}
            className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
              isAttending
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isAttending ? "Cancel" : "Attend"}
          </button>
          <p className="text-sm text-gray-600 mt-1">{attendees} attending</p>
        </div>
      </div>
    </div>
  );
}
