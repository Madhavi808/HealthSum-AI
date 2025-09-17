import React from "react";
import { AlertTriangle, Info, CheckCircle } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Medication Review Due",
    description: "Annual medication review is due next week",
    dateLabel: "Due",
    date: "January 20, 2025",
    icon: <AlertTriangle className="text-yellow-600" />,
    bg: "bg-yellow-50",
    textColor: "text-yellow-800",
  },
  {
    id: 2,
    type: "info",
    title: "Lab Results Available",
    description: "Recent blood work results are ready for review",
    dateLabel: "Completed",
    date: "January 5, 2025",
    icon: <Info className="text-blue-600" />,
    bg: "bg-blue-50",
    textColor: "text-blue-800",
  },
  {
    id: 3,
    type: "success",
    title: "Vaccination Up to Date",
    description: "All required vaccinations are current",
    dateLabel: "Next due",
    date: "December 2025",
    icon: <CheckCircle className="text-green-600" />,
    bg: "bg-green-50",
    textColor: "text-green-800",
  },
];

const PatientAlerts = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 ">
      <h2 className="font-semibold flex items-center gap-2 mb-4">
        {/* <AlertTriangle className="text-yellow-600" size={20} /> */}
        Notifications
      </h2>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-xl shadow-sm p-2 flex items-start gap-3 ${alert.bg}`}
          >
            <div className="mt-1">{alert.icon}</div>
            <div>
              <h3 className={`font-semibold ${alert.textColor}`}>
                {alert.title}
              </h3>
              <p className="text-sm text-gray-700">{alert.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {alert.dateLabel}: {alert.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientAlerts;
