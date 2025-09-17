import React, { useState } from "react";
import { Upload, AlertCircle, Loader2 } from "lucide-react";
import { useSummary } from "../components/SummaryContext";
import SummaryDisplay from "../components/SummaryDisplay";

// Capitalize each word
function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) =>
      word.length > 0
        ? word[0].toUpperCase() + word.slice(1).toLowerCase()
        : ""
    )
    .join(" ");
}


function parseBackendResponse(data) {
  let rawText = "";

  if (typeof data === "string") {
    rawText = data;
  } else if (data && typeof data.summary === "string") {
    rawText = data.summary; // if backend sends { summary: "..." }
  } else {
    rawText = JSON.stringify(data);
  }

  console.log("rawText: ", rawText);
  let parsedSummary = "";
  let parsedAlerts = [];

  try {

    rawText = rawText.replace(/^["'`]|["'`]$/g, "");

    rawText = rawText.replace(/\\n/g, "\n");

    console.log("🔍 rawText after enter:", rawText);

    const parts = rawText
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);

    console.log("🔍 parts:", parts);

    const part1 = parts.find((p) => p.startsWith("1."));
    const part2 = parts.find((p) => p.startsWith("2."));

    console.log("part1: ", part1);
    console.log("part2: ", part2)

    if (part1) {
      parsedSummary = part1.replace(/^1\.\s*/, "");
      console.log(parsedSummary);
    }
    /*if (part2) {
      const clean = part2.replace(/^2\.\s/, "");
      if (/^Critical alerts?:/i.test(clean)) {
        parsedAlerts = [clean.replace(/^Critical alerts?:\s/i, "")];
        console.log(parsedAlerts);
      } else {
        parsedAlerts = [clean];
      }
    }*/
    if (part2) {
      const clean = part2.replace(/^2\.\s*/, "");
      let alertText = /^Critical alerts?:\s*/i.test(clean)
        ? clean.replace(/^Critical alerts?:\s*/i, "")
        : clean;
    
      // Split alerts by common delimiters (, ; or "and")
      parsedAlerts = alertText
        .split(/,|;| and /i) // split by comma, semicolon, or "and"
        .map((a) => a.trim())
        .filter(Boolean)
        .map((a) => capitalizeWords(a));
    }
  } catch (err) {
    console.error("Parsing failed, using raw text:", err);
    parsedSummary = rawText;
  }

  return { summary: parsedSummary, alerts: parsedAlerts };
}

export default function UploadSummarizePage() {
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { setSummaryData } = useSummary(); // <-- add

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
      setFileName(file.name);
    } else {
      setFile(null);
      setFileName(null);
      alert("Please upload a PDF file");
    }
  };

  // Analyze handler
   // Summarize handler (notes path preserved, pdf path uses API, both have fallbacks)
   const handleAnalyze = async () => {
    // Require either notes OR an uploaded PDF
    if (!notes.trim() && !file) {
      alert("Please paste notes or upload a PDF before summarizing.");
      return;
    }

    setLoading(true);
    setSummary("");
    setAlerts([]);


   // try {

      /*const formData = new FormData();
      if (file) {
        formData.append("file", file, file.name);
      }
      if (notes.trim()) {
        formData.append("note", notes.trim());
      }
      formData.append("patient_id", "1234"); // make dynamic later if needed
  
      const res = await fetch(
        "https://healthsumai-backend-cdefeeedhqf8bsfn.canadacentral-01.azurewebsites.net/process-note",
        {
          method: "POST",
          body: formData,
          headers: { accept: "application/json" }, // don't set Content-Type manually
        }
      );
  
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
  
      // Parse backend response (string with 1. summary / 2. alerts)
      const { summary: parsedSummary, alerts: parsedAlerts } = parseBackendResponse(data);*/

    // 1) NOTES PATH (use original mock behavior)
    if (notes.trim()) {
      setSummary(
        "Patient reports chest discomfort and dizziness. History shows uncontrolled hypertension and irregular medication intake. Requires urgent follow-up."
      );
      setAlerts([
        "Severe Hypertension Risk",
        "Possible Cardiac Event",
        "Chest Pain Requires Immediate Evaluation",
      ]);
      setLoading(false);
      return;
    }

    // 2) PDF PATH (call backend)
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("patient_id", "1234"); // make dynamic later if needed

      const res = await fetch(
        "https://healthsumai-backend-cdefeeedhqf8bsfn.canadacentral-01.azurewebsites.net/process-note",
        {
          method: "POST",
          body: formData,
          headers: { accept: "application/json" }, // don't set Content-Type manually
        }
      );

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();



      const { summary: parsedSummary, alerts: parsedAlerts } = parseBackendResponse(data.summary);
      /*const rawText =
      "1. Male patient with anterior wall MI complicated by pericardial effusion, cardiogenic shock, arrhythmia, renal impairment, metabolic acidosis, and multi-organ failure.  \\n2. Critical alerts: cardiogenic shock and multi-organ failure require urgent intervention.";

      const result = parseBackendResponse(rawText);
      const parsedSummary = result.summary;
      const parsedAlerts = result.alerts;*/
      console.log("✅ Parsed summary:", parsedSummary);
      console.log("✅ Parsed alerts:", parsedAlerts);
      setSummary(
        parsedSummary ||
          "Male patient with anterior wall MI complicated by pericardial effusion, cardiogenic shock, arrhythmia, renal impairment, metabolic acidosis, and multi-organ failure."
      );
      setAlerts(
        Array.isArray(parsedAlerts) && parsedAlerts.length > 0
          ? parsedAlerts
          : ["Cardiogenic Shock", "Multi-organ Failure"]
      );
     

    } catch (err) {
      console.error("Summarize failed:", err);
      // Original PDF fallback on error
      setSummary(
        "Male patient with anterior wall MI complicated by pericardial effusion, cardiogenic shock, arrhythmia, renal impairment, metabolic acidosis, and multi-organ failure."
      );
      setAlerts(["Cardiogenic Shock", "Multi-organ Failure"]);
    } finally {
      setLoading(false);
    }
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
                <Loader2 className="animate-spin" size={18} /> Summarizing..
              </span>
            ) : (
              "Summarize"
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
          ) : (
            // SummaryDisplay keeps the "No summary available yet..." behavior
            <SummaryDisplay summary={summary} alerts={alerts} />
          )}
          
          {/* Actions - only show if summary exists */}
          {summary && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => {
                    setSummaryData({ summary, alerts }); // ⏱️ timestamp saved here
                    alert("Patient Summary updated! Check the Summary tab in Patient Info.");
                  }}
                  className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    setNotes("");
                    setFileName(null);
                    setSummary("");
                    setAlerts([]);
                  }}
                  className="mt-6 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  Reset
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
