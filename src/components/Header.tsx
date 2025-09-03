"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/create-event", label: "Create Event" },
    { href: "/my-events", label: "My Events" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Home link */}
          <Link
            href="/"
            className="font-extrabold text-2xl tracking-wide text-orange-500"
          >
            Event Manager
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 items-center">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors duration-300 ${
                  pathname === href
                    ? "text-orange-500 font-semibold"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {!isOpen && <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Modal Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          <div className="w-64 bg-white h-full shadow-lg p-6 space-y-4">
            {/* Close button inside modal */}
            <button
              type="button"
              className="mb-4 p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block rounded px-2 py-2 text-lg transition-colors duration-300 ${
                  pathname === href
                    ? "text-orange-500 font-semibold"
                    : "text-gray-700 hover:text-orange-500"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
