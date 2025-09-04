"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEventStore } from "@/stores/eventStore";
import { Event } from "@/types/event";

interface EventFormProps {
  existingEventId?: string; // pass for edit mode
}

export default function EditEventForm({ existingEventId }: EventFormProps) {
  const router = useRouter();
  const { events, updateEvent, addEvent } = useEventStore();

  const [formData, setFormData] = useState<Event>({
    id: "",
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    userId: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load event from global state if editing
  useEffect(() => {
    if (existingEventId) {
      const eventToEdit = events.find((e) => e.id === existingEventId);
      if (eventToEdit) {
        setFormData(eventToEdit);
      }
    }
  }, [existingEventId, events]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Ensure userId exists
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("userId", userId);
    }

    if (formData.id) {
      // Update existing event
      await updateEvent({ ...formData, userId });
    } else {
      // Add new event
      await addEvent({ ...formData, userId });
    }

    setIsLoading(false);
    router.push("/my-events");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="border border-gray-400 outline-none p-2 w-full rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border border-gray-400 outline-none p-2 w-full rounded"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border border-gray-400 outline-none p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border border-gray-400 outline-none p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-400 outline-none p-2 w-full rounded"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-orange-500 text-white px-12 py-2 rounded transition-colors duration-200 cursor-pointer hover:bg-orange-600 flex items-center justify-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : formData.id ? (
            "Update"
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
}
