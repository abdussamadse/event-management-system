import { Event } from "@/types/event";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/events/${event.id}`);
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
    </div>
  );
}
