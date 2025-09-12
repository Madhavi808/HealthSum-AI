// src/components/StatsCard.jsx
export default function StatsCard({ title, value, highlight }) {
  return (
    <div
      className={`flex justify-between items-center p-4 rounded-xl shadow-sm border bg-white ${
        highlight ? "border-red-500 bg-red-50" : ""
      }`}
    >
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
