import React, { useState } from "react";
import { Upload, AlertCircle, Loader2 } from "lucide-react";

export default function UploadSummarizePage() {
  const [fileName, setFileName] = useState(null);
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
    } else {
      alert("Please upload a PDF file");
    }
  };

  // Analyze handler
  const handleAnalyze = () => {
    if (!notes.trim() && !fileName) {
      alert("Please paste notes or upload a PDF before analyzing.");
      return;
    }

    setLoading(true);
    setSummary("");
    setAlerts([]);

    setTimeout(() => {
      if (notes.trim()) {
        setSummary(
          "Patient reports chest discomfort and dizziness. History shows uncontrolled hypertension and irregular medication intake. Requires urgent follow-up.Patient reports chest discomfort and dizziness. History shows uncontrolled hypertension and irregular medication intake. Requires urgent follow-up."
        );
        setAlerts([
          "Severe Hypertension Risk",
          "Possible Cardiac Event",
          "Chest Pain Requires Immediate Evaluation",
        ]);
      } else if (fileName) {
        setSummary(
          "PDF indicates abnormal ECG results with signs of myocardial ischemia. Recommend urgent cardiology consultation and further diagnostic tests."
        );
        setAlerts([
          "Critical ECG Abnormality",
          "High Risk of Myocardial Infarction",
        ]);
      }
      setLoading(false);
    }, 2000);
  };

  return (

    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Upload and Summarize Patient Data</h1>
          <p className="text-gray-500 text-sm">
            Upload patient details and get AI-generated summaries and alerts
          </p>
        </div>
        
      </div>
    
      <div className=" grid md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 border">
          <h2 className="text-lg font-bold text-blue-600 mb-4">
            Patient Assistant
          </h2>

          {/* Notes */}
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste clinical notes here..."
            className="w-full border rounded-lg p-3  text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            rows={5}
          />

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Upload PDF */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-blue-400">
            <Upload size={32} className="text-blue-500 mb-2" />
            <p className="text-gray-600">Click to upload a PDF file</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
            >
              Upload PDF
            </label>
          </div>

          {fileName && (
            <p className="text-sm text-gray-500 mt-3">Uploaded: {fileName}</p>
          )}

          {/* Action Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={18} /> Analyzing...
              </span>
            ) : (
              "Analyze"
            )}
          </button>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 border ">
          <h2 className="text-lg font-bold text-blue-600 mb-4">
            AI Patient Summary
          </h2>

          {loading ? (
            <p className="text-gray-500">Processing data...</p>
          ) : !summary ? (
            <p className="text-gray-500">
              No summary available yet. Paste notes or upload a file, then click
              Analyze.
            </p>
          ) : (
            <>
              {/* Summary */}
              <div className="mb-4">
                  <h3 className="font-semibold text-gray-800">Summary</h3>
                  <p className="text-gray-600 mt-1">
                      {expanded || summary.length <= 160
                      ? summary
                      : summary.slice(0, 160) + "..."}
                  </p>
                  {summary.length > 160 && (
                      <button
                      onClick={() => setExpanded(!expanded)}
                      className="text-blue-600 text-sm mt-2 hover:underline"
                      >
                      {expanded ? "View Less" : "View More"}
                      </button>
                  )}
              </div>

              {/* Critical Alerts */}
              {alerts.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Critical Alerts
                  </h3>
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
              <div className="flex justify-center">
                <button
                    onClick={() => {
                        setNotes("");
                        setFileName(null);
                        setSummary("");
                        setAlerts([]);
                        setExpanded(false);
                    }}
                    className="mt-6 bg-gray-100  text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                    >
                    Reset
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
