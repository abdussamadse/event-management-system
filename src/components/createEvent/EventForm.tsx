"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEventStore } from "@/stores/eventStore";

// Event form fields (store handles `id`)
interface EventFormData {
  userId: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
}

// Simple UUID generator (browser-friendly)
const generateId = () =>
  crypto.randomUUID?.() || Math.random().toString(36).substring(2, 12);

export default function EventForm() {
  const router = useRouter();
  const addEvent = useEventStore((s) => s.addEvent); // ✅ use store action

  const [formData, setFormData] = useState<EventFormData>({
    userId: "",
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Ensure a persistent userId in localStorage
  useEffect(() => {
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = generateId();
      localStorage.setItem("userId", storedId);
    }
    setFormData((prev) => ({ ...prev, userId: storedId! }));
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addEvent(formData); // ✅ call store instead of manual fetch
      router.push("/my-events");
    } catch (err) {
      console.error("Failed to create event", err);
    } finally {
      setIsLoading(false);
    }
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
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
}
