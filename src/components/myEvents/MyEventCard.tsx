"use client";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";
import { Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useEventStore } from "@/stores/eventStore";
import { useEffect, useState } from "react";

interface EventCardProps {
  event: Event;
}

export default function MyEventCard({ event }: EventCardProps) {
  const router = useRouter();
  const deleteEvent = useEventStore((s) => s.deleteEvent);
  const [attendees, setAttendees] = useState<number>(0);
  const [isAttending, setIsAttending] = useState<boolean>(false);

  // Handle event deletion with confirmation
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteEvent(event.id);

        Swal.fire({
          title: "Deleted!",
          text: "The event has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Delete event failed:", err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while deleting.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  // Navigate to edit page
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/edit-event/${event.id}`);
  };

  // Navigate to event detail page
  const handleView = () => {
    router.push(`/events/${event.id}`);
  };

  // Load RSVP data from localStorage on mount
  useEffect(() => {
    const rsvps: Record<string, number> = JSON.parse(
      localStorage.getItem("rsvps") || "{}"
    );
    setAttendees(rsvps[event.id] || 0);

    // If RSVP count > 0, mark as attending (since we no longer track per user)
    setIsAttending((rsvps[event.id] || 0) > 0);
  }, [event.id]);

  const handleRSVP = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

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
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-xl text-gray-800 mb-2">{event.title}</h3>
        <div className="flex justify-end mt-4 gap-4">
          <button
            onClick={handleEdit}
            className="text-gray-700 hover:text-orange-500 cursor-pointer rounded flex items-center gap-1 transition-colors duration-200"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-700 hover:text-orange-500 cursor-pointer rounded flex items-center gap-1 transition-colors duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-1">
        {new Date(event.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="text-gray-700 text-sm mb-3">{event.location}</p>
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
