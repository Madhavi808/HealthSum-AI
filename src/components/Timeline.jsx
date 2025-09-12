import React from "react";
import { Clock, User, FileText } from "lucide-react"; // icons for timeline

// Sample timeline data based on your image
const timelineData = [
  {
    time: "09:00 AM",
    description: "Dr. Lee updated prescription for John Doe",
    subDescription: "Changed Metformin dosage to 1000mg BID",
    icon: "clock",
  },
  {
    time: "10:30 AM",
    description: "Nurse Anna added vitals for Jane Smith",
    subDescription: "BP: 120/80, HR: 72, Temp: 98.6°F",
    icon: "user",
  },
  {
    time: "11:15 AM",
    description: "Dr. Smith completed consultation for Robert Wilson",
    subDescription: "Routine check-up, no concerns noted",
    icon: "user",
  },
  {
    time: "12:45 PM",
    description: "Lab results uploaded for Maria Garcia",
    subDescription: "Complete Blood Count and Basic Metabolic Panel",
    icon: "file",
  },
  {
    time: "02:20 PM",
    description: "Dr. Johnson updated treatment plan for David Brown",
    subDescription: "Added physical therapy sessions",
    icon: "user",
  },
  {
    time: "03:45 PM",
    description: "Nurse Carol administered medication to Sarah Davis",
    subDescription: "Administered prescribed antibiotics",
    icon: "user",
  },
];

const Timeline = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Timeline Snapshot</h2>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {timelineData.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                {item.icon === "clock" && <Clock className="w-4 h-4 text-gray-600" />}
                {item.icon === "user" && <User className="w-4 h-4 text-gray-600" />}
                {item.icon === "file" && <FileText className="w-4 h-4 text-gray-600" />}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">{item.time}</p>
              <p className="font-medium text-gray-800">{item.description}</p>
              <p className="text-sm text-gray-500">{item.subDescription}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <a href="#" className="text-blue-600 text-sm hover:underline">
          View Full Timeline
        </a>
      </div>
    </div>
  );
};

export default Timeline;
