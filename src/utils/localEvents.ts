import { Event } from "@/types/event";

const LOCAL_KEY = "local_events";

// Get events from localStorage
export function getLocalEvents(): Event[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(LOCAL_KEY);
  return data ? JSON.parse(data) : [];
}

// Save events to localStorage
export function saveLocalEvents(events: Event[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(events));
}
