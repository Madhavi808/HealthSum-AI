// src/components/Alerts.jsx
import { AlertTriangle, Info, XCircle } from "lucide-react";

export default function Alerts() {
  const alerts = [
    { type: "Info", message: "New lab result for Jane Smith", time: "2 minutes ago" },
    { type: "Critical", message: "Patient status changed to Critical - John Doe", time: "15 minutes ago" },
    { type: "Warning", message: "Medication allergy noted for Maria Garcia", time: "1 hour ago" },
    { type: "Info", message: "New appointment scheduled for Dr. Lee", time: "2 hours ago" },
  ];

  const getAlertStyle = (type) => {
    switch (type) {
      case "Critical":
        return "bg-red-100 text-red-700 border-red-300";
      case "Warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-blue-100 text-blue-700 border-blue-300";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "Critical":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "Warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Alerts</h3>
        <button className="text-sm text-blue-600 hover:underline">View All Alerts</button>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`flex items-center justify-between p-3 border rounded-lg ${getAlertStyle(
              alert.type
            )}`}
          >
            <div className="flex items-center gap-2">
              {getIcon(alert.type)}
              <span className="font-medium">{alert.message}</span>
            </div>
            <span className="text-xs text-gray-500">{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
