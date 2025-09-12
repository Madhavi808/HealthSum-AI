// src/components/Appointments.jsx
import { useState } from "react";

export default function Appointments() {
  const [filter, setFilter] = useState("Today");

  const data = [
    { time: "10:15 AM", patient: "Jane Smith", doctor: "Dr. Johnson", type: "Follow-up", status: "Pending" },
    { time: "11:00 AM", patient: "Robert Wilson", doctor: "Nurse Anna", type: "Check-up", status: "Confirmed" },
    { time: "02:30 PM", patient: "Maria Garcia", doctor: "Dr. Lee", type: "Surgery Consult", status: "Cancelled" },
    { time: "03:45 PM", patient: "David Brown", doctor: "Dr. Smith", type: "Lab results", status: "Confirmed" },
    { time: "04:30 PM", patient: "Sarah Davis", doctor: "Dr. Johnson", type: "Initial Exam", status: "Pending" },
  ];

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Today's Appointments</h3>
        <div className="flex gap-2">
          {["Today", "This Week", "All"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-lg text-sm ${
                filter === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {data.map((appt, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
          >
            <span className="font-medium">{appt.time}</span>
            <span>{appt.patient}</span>
            <span className="text-gray-500">{appt.doctor}</span>
            <span className="text-gray-500">{appt.type}</span>
            <span
              className={`px-2 py-1 text-xs rounded-lg font-medium ${statusColors[appt.status]}`}
            >
              {appt.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
