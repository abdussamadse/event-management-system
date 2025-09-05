export default function MyEventCardSkeleton() {
  return (
    <div className="border border-gray-200 p-6 rounded-2xl shadow-sm bg-white animate-pulse">
      {/* Title */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

      {/* Date */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>

      {/* Location */}
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>

      {/* Badge */}
      <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
    </div>
  );
}
