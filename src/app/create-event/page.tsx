"use client";

import { useEffect } from "react";
import EventForm from "@/components/createEvent/EventForm";

export default function CreateEventPage() {
  // Ensure userId exists in localStorage
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("userId", userId);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <h2 className="text-xl font-bold mb-4">Create New Event</h2>
      <EventForm />
    </div>
  );
}
