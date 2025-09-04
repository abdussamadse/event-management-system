import { create } from "zustand";
import { Event } from "@/types/event";

// Define the shape of the store
interface EventStore {
  events: Event[];
  search: string;
  category: string;
  loading: boolean;
  error: string | null;

  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setEvents: (events: Event[]) => void;

  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<Event, "id">) => Promise<void>;
  updateEvent: (event: Event) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  search: "",
  category: "",
  loading: false,
  error: null,

  setSearch: (value) => set({ search: value }),
  setCategory: (value) => set({ category: value }),
  setEvents: (events: Event[]) => set({ events }),

  // Fetch all events
  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data: Event[] = await res.json();
      set({ events: data, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  // Add new event
  addEvent: async (eventData) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      if (!res.ok) throw new Error("Failed to add event");
      const newEvent: Event = await res.json();
      set({ events: [...get().events, newEvent], loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  // Update event by ID
  updateEvent: async (eventData) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      if (!res.ok) throw new Error("Failed to update event");
      const updated: Event = await res.json();
      set({
        events: get().events.map((e) => (e.id === updated.id ? updated : e)),
        loading: false,
      });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  // Delete event by ID
  deleteEvent: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");
      await res.json();
      set({
        events: get().events.filter((e) => e.id !== id),
        loading: false,
      });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));
