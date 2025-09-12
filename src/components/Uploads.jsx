// src/components/RecentUploads.jsx
import { FileText, Image, FileSpreadsheet } from "lucide-react";

export default function Uploads() {
  const uploads = [
    { name: "Lab_Results_John_Doe_2024.pdf", patient: "John Doe", type: "pdf", size: "2.3 MB", time: "10 minutes ago" },
    { name: "X-Ray_Chest_Jane_Smith.png", patient: "Jane Smith", type: "image", size: "4.7 MB", time: "1 hour ago" },
    { name: "Blood_Panel_Robert_Wilson.xlsx", patient: "Robert Wilson", type: "excel", size: "1.2 MB", time: "2 hours ago" },
    { name: "Consultation_Notes_Maria_Garcia.docx", patient: "Maria Garcia", type: "doc", size: "850 KB", time: "3 hours ago" },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "image":
        return <Image className="w-5 h-5 text-blue-500" />;
      case "excel":
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Uploads</h3>
        <button className="text-sm text-blue-600 hover:underline">View All Uploads</button>
      </div>

      <div className="space-y-3">
        {uploads.map((file, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              {getIcon(file.type)}
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">Patient: {file.patient}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{file.size}</p>
              <p className="text-xs text-gray-400">{file.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
