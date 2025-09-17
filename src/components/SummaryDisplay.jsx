// src/context/SummaryDisplay.jsx
import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function SummaryDisplay({ summary, alerts, hideTitle = false }) {
  const [expanded, setExpanded] = useState(false);

  if (!summary) {
    return (
      <p className="text-gray-500">
        No summary available yet. Paste notes or upload a file, then click
        Summarize.
      </p>
    );
  }

  return (
    <div>
      {/* Summary */}
      <div className="mb-4">
        {!hideTitle && (
          <h3 className="font-semibold text-gray-800">Summary</h3>
        )}
        <p className="text-gray-600 mt-1 whitespace-pre-line">
          {expanded || summary.length <= 170
            ? summary
            : summary.slice(0, 170) + "..."}
        </p>
        {summary.length > 170 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 text-sm mt-2 hover:underline"
          >
            {expanded ? "View Less" : "View More"}
          </button>
        )}
      </div>

      {/* Critical Alerts */}
      {alerts?.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Critical Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border px-4 py-3 rounded-lg bg-red-100 border-red-300 text-red-700"
              >
                <AlertCircle size={20} className="text-red-600" />
                <span className="font-medium">{alert}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}