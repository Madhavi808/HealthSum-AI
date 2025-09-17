// src/components/SummaryContext.jsx
import React, { createContext, useContext, useState } from "react";

const SummaryContext = createContext(null);

export const SummaryProvider = ({ children }) => {
  const [aiSummary, setAiSummary] = useState("");
  const [criticalAlerts, setCriticalAlerts] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const setSummaryData = ({ summary, alerts }) => {
    setAiSummary(summary || "");
    setCriticalAlerts(Array.isArray(alerts) ? alerts : []);
    setLastUpdated(new Date()); // ⏱️ store current timestamp
  };

  return (
    <SummaryContext.Provider
      value={{ aiSummary, criticalAlerts, lastUpdated, setSummaryData }}
    >
      {children}
    </SummaryContext.Provider>
  );
};

export const useSummary = () => {
  const ctx = useContext(SummaryContext);
  if (ctx === null) {
    throw new Error("useSummary must be used within <SummaryProvider>");
  }
  return ctx;
};