import MyEventList from "@/components/myEvents/MyEventList";

export default function MyEvents() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <h2 className="text-xl font-bold mb-4">My Events</h2>
      <MyEventList />
    </div>
  );
}
