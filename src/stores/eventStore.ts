import { create } from "zustand";
import { Event } from "@/types/event";
import { getLocalEvents, saveLocalEvents } from "@/utils/localEvents";

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

  // Fetch both JSON (API) + localStorage
  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      // 1. From API (json file)
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const jsonEvents: Event[] = await res.json();

      // 2. From localStorage
      const localEvents = getLocalEvents();

      // 3. Merge
      set({ events: [...jsonEvents, ...localEvents], loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  // Add only to localStorage
  addEvent: async (eventData) => {
    set({ loading: true, error: null });
    try {
      const newEvent: Event = { ...eventData, id: Date.now().toString() };
      const localEvents = getLocalEvents();
      const updated = [...localEvents, newEvent];
      saveLocalEvents(updated);

      set({ events: [...get().events, newEvent], loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  // Update only in localStorage
  updateEvent: async (eventData) => {
    set({ loading: true, error: null });
    try {
      const localEvents = getLocalEvents().map((e) =>
        e.id === eventData.id ? eventData : e
      );
      saveLocalEvents(localEvents);

      set({
        events: get().events.map((e) =>
          e.id === eventData.id ? eventData : e
        ),
        loading: false,
      });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  // Delete only in localStorage
  deleteEvent: async (id) => {
    set({ loading: true, error: null });
    try {
      const localEvents = getLocalEvents().filter((e) => e.id !== id);
      saveLocalEvents(localEvents);

      set({
        events: get().events.filter((e) => e.id !== id),
        loading: false,
      });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));
