// src/components/Navbar.jsx
import { Share2, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b shadow-sm">
      <h2 className="text-lg font-semibold">Welcome, Dr. Smith! </h2>
      <div className="flex gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Share2 size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}
