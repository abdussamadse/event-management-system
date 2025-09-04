"use client";

import { useParams } from "next/navigation";
import EditEventForm from "@/components/editEvent/EditEventForm";

export default function EditEventPage() {
  // Define type for route params
  const params = useParams() as { id?: string };
  const eventId: string | undefined = params.id;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <h2 className="text-xl font-bold mb-4">Edit Event</h2>
      {eventId ? (
        <EditEventForm existingEventId={eventId} />
      ) : (
        <p className="text-red-500">Event ID is missing.</p>
      )}
    </div>
  );
}
