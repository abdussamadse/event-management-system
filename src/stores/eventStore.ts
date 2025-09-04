import { create } from "zustand";
import { Event } from "@/types/event";
import { events as initialEvents } from "@/lib/data";

// Define the shape of the store
interface EventStore {
  events: Event[];
  search: string;
  category: string;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
}

// Create the Zustand store
export const useEventStore = create<EventStore>((set) => ({
  events: initialEvents,
  search: "",
  category: "",
  setSearch: (value) => set({ search: value }),
  setCategory: (value) => set({ category: value }),
}));
