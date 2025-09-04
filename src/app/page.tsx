import SearchFilter from "@/components/home/SearchFilter";
import EventList from "@/components/home/EventList";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex flex-col gap-4 mb-10">
      <SearchFilter />
      <EventList />
    </div>
  );
}
