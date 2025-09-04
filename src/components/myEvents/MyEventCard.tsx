"use client";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";
import { Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

interface EventCardProps {
  event: Event;
  onDelete?: (id: string) => void;
}

export default function MyEventCard({ event, onDelete }: EventCardProps) {
  const router = useRouter();

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
      const storedEvents: Event[] = JSON.parse(
        localStorage.getItem("myEvents") || "[]"
      );
      const updatedEvents = storedEvents.filter((e) => e.id !== event.id);
      localStorage.setItem("myEvents", JSON.stringify(updatedEvents));

      Swal.fire({
        title: "Deleted!",
        text: "The event has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      if (onDelete) onDelete(event.id); // Update parent state
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/edit-event/${event.id}`);
  };

  const handleView = () => {
    router.push(`/events/${event.id}`);
  };

  return (
    <div
      onClick={handleView}
      className="border border-gray-200 p-6 rounded-2xl shadow-sm bg-white hover:shadow-xl hover:border-orange-500 hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <h3 className="font-bold text-xl text-gray-800 mb-2">{event.title}</h3>
      <p className="text-gray-500 text-sm mb-1">
        {new Date(event.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="text-gray-700 text-sm mb-3">{event.location}</p>
      <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">
        {event.category}
      </span>

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
  );
}
