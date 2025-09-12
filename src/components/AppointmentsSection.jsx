import React from "react";
import { Calendar, Plus } from "lucide-react";

const AppointmentsSection = () => {
  const appointments = [
    {
      title: "Follow-up Visit",
      date: "2025-01-15 at 10 AM",
      with: "Dr. Johnson",
    },
    {
      title: "Lab Work",
      date: "2025-02-20 at 2 PM",
      with: "Lab Tech",
    },
    {
      title: "Cardiology Consultation",
      date: "2025-03-15 at 9 AM",
      with: "Dr. Smith",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold ">Appointments</h3>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={18} />
          Schedule New
        </button>
      </div>

      {/* Appointment List */}
      <div className="space-y-4">
        {appointments.map((appt, index) => (
          <div
            key={index}
            className="flex justify-between items-start border p-2 rounded-lg hover:shadow-sm transition"
          >
            {/* Left side - Icon + Info */}
            <div className="flex items-start gap-4">
              <Calendar size={28} className="text-blue-500 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">{appt.title}</p>
                <p className="text-sm text-gray-500">{appt.date} with {appt.with}</p>
                
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex gap-3">
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm">
                
                Edit
              </button>
              <button className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm">
                
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsSection;
