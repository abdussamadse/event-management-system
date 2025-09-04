"use client";

import { useState } from "react";
import { ChevronsDown } from "lucide-react";
import { useEventStore } from "@/stores/eventStore";

export default function SearchFilter() {
  const search = useEventStore((state) => state.search);
  const category = useEventStore((state) => state.category);
  const setSearch = useEventStore((state) => state.setSearch);
  const setCategory = useEventStore((state) => state.setCategory);

  // Get unique categories from events
  const categories = Array.from(
    new Set(useEventStore.getState().events.map((e) => e.category))
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-7xl">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-400 rounded-lg px-4 py-2 outline-none w-full sm:w-4/7"
      />

      {/* Custom dropdown */}
      <div className="relative w-full sm:w-2/7">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="border border-gray-400 rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer"
        >
          <span>{category || "All Categories"}</span>
          <ChevronsDown
            className={`w-5 h-5 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-80 overflow-auto">
            <div
              onClick={() => {
                setCategory("");
                setDropdownOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              All Categories
            </div>
            {categories.map((c) => (
              <div
                key={c}
                onClick={() => {
                  setCategory(c);
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {c}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          setSearch("");
          setCategory("");
        }}
        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer w-full sm:w-1/7"
      >
        Clear
      </button>
    </div>
  );
}
