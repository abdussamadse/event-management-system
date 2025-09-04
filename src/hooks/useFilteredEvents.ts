import { useMemo } from "react";
import { useEventStore } from "@/stores/eventStore";

export function useFilteredEvents() {
  const events = useEventStore((s) => s.events);
  const search = useEventStore((s) => s.search);
  const category = useEventStore((s) => s.category);

  return useMemo(() => {
    const tokens = search.toLowerCase().split(" ").filter(Boolean);
    return events.filter((e) => {
      const haystack = `${e.title} ${e.description} ${e.location} ${e.category}`.toLowerCase();
      return tokens.every((t) => haystack.includes(t)) &&
             (!category || e.category === category);
    });
  }, [events, search, category]);
}
