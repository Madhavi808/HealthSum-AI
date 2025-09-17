import { useState } from "react";

export default function Header({ onRecordToggle, isRecording, time, onAutofill, useContext, setUseContext }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg mb-4">
      <h2 className="text-lg font-semibold">AI Scribe – Clinician Notes</h2>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" />
          Consent obtained
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={useContext}
            onChange={(e) => setUseContext(e.target.checked)}
          />
          Use prior notes as context
        </label>

        {/* Record button */}
        <button
          onClick={onRecordToggle}
          className={`px-4 py-2 rounded-lg text-white ${isRecording ? "bg-red-500" : "bg-blue-500"}`}
        >
          {isRecording ? "Stop" : "Record"}
        </button>
        {isRecording && <span className="text-sm text-red-600">{time}s</span>}

        {/* Autofill button */}
        <button
          onClick={onAutofill}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Autofill
        </button>
      </div>
    </header>
  );
}
