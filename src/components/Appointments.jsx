// src/components/Appointments.jsx
import { useState } from "react";
import { Clock, User, Stethoscope, FileText } from "lucide-react";

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
    <div className="bg-white p-3 rounded-xl shadow-sm border">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Today's Appointments</h3>
        <div className="flex gap-2">
          {["Today", "This Week", "All"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-lg text-sm transition ${
                filter === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Appointment Cards */}
      <div className="space-y-3">
        {data.map((appt, i) => (
          <div
            key={i}
            className="grid grid-cols-5 items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-500" />
              <span className="font-medium">{appt.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-500" />
              <span>{appt.patient}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Stethoscope size={16} />
              <span>{appt.doctor}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FileText size={16} />
              <span>{appt.type}</span>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-lg font-medium text-center ${statusColors[appt.status]}`}
            >
              {appt.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
