import React from "react";
import { Upload, Download, FileText } from "lucide-react";

const Documents = () => {
  const documents = [
    {
      title: "Lab Result - Blood Panel",
      type: "Lab Report",
      date: "2025-01-05",
    },
    {
      title: "Cardiology Consultation",
      type: "Consultation",
      date: "2024-12-20",
    },
    {
      title: "Prescription - Metformin",
      type: "Prescription",
      date: "2024-12-15",
    },
    {
      title: "X-Ray - Chest",
      type: "Imaging",
      date: "2024-12-10",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold ">Recent Documents</h3>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Upload size={18} />
          Upload New
        </button>
      </div>

      {/* Document List */}
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-2 rounded-lg hover:shadow-sm transition"
          >
            {/* Left side */}
            <div className="flex items-center gap-4">
              <FileText size={28} className="text-blue-500" />
              <div>
                <p className="font-semibold text-gray-900">{doc.title}</p>
                <p className="text-sm text-gray-500">
                  {doc.type} · {doc.date}
                </p>
              </div>
            </div>

            {/* Right side - Download */}
            <button className="text-gray-600 hover:text-blue-600">
              <Download size={22} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
