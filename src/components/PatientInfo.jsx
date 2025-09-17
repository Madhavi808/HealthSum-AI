import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PatientAlerts from "./PatientAlerts";
import MedicalHistory from "./MedicalHistory";
import Documents from "./Documents";
import AppointmentsSection from "./AppointmentsSection";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Calendar, HeartPulse, User, UserRound } from "lucide-react";
import VitalSignsTrend from "./VitalSignsTrend";

import SummaryDisplay from "./SummaryDisplay";
import { useSummary } from "./SummaryContext";


const PatientInfo = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Summary");
  const { aiSummary, criticalAlerts, lastUpdated } = useSummary(); 
  const navigate = useNavigate();
  
  // Dummy patient data (later fetch by ID)
  const patient = {
    id,
    name: "John Doe",
    age: 45,
    gender: "Male",
    condition: "Hypertension, Diabetes",
    lastVisit: "2024-01-15",
    doctor: "Dr. Smith",
    statuses: [
      { label: "High Priority", color: "bg-red-100 text-red-700 border-red-300" },
      { label: "Critical", color: "bg-gray-100 text-gray-700 border-gray-300" },
    ],
  };

  const widgets = [
    {
      icon: <User className="text-blue-600" size={20} />,
      label: "Age",
      value: "45 years",
    },
    {
      icon: <HeartPulse className="text-green-600" size={20} />,
      label: "Gender",
      value: "Male",
    },
    {
      icon: <UserRound className="text-purple-600" size={20} />,
      label: "Primary Condition",
      value: "Hypertension, Diabetes",
    },
    {
      icon: <Calendar className="text-orange-600" size={20} />,
      label: "Last Visit",
      value: "2024-01-15",
    },
  ];
  
  return (
    <div className="">
      {/* Header */}
      {/* <h1 className="text-2xl font-bold mb-2">Medical Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Welcome back, {patient.doctor} <br />
        <span className="text-sm">Patient ID: {patient.id}</span>
      </p> */}
      
      <div className="flex justify-between items-center bg-white p-6 shadow rounded-xl mb-6">
      
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-white border border-blue-600 p-3 rounded-lg hover:bg-blue-50 transition"  onClick={() => navigate(`/patients`)}>
            <ArrowLeft size={18} />
          </button>
          <div>
          {/* Patient Info */}
          <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
          <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
          </div>
        </div>

        {/* Right Side - Status Pills */}
        <div className="flex gap-3">
          {patient.statuses.map((status, index) => (
            <span
              key={index}
              className={`px-4 py-1 rounded-full text-sm font-medium border ${status.color}`}
            >
              {status.label}
            </span>
          ))}
        </div>
      </div>

      {/* Widgets */}
      {/* <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Age</p>
          <p className="text-lg font-bold">{patient.age} years</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Gender</p>
          <p className="text-lg font-bold">{patient.gender}</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Primary Condition</p>
          <p className="text-lg font-bold">{patient.condition}</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Last Visit</p>
          <p className="text-lg font-bold">{patient.lastVisit}</p>
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {widgets.map((w, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="p-2 bg-gray-50 rounded-lg">{w.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{w.label}</p>
              <p className="font-semibold">{w.value}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        {["Summary", "Medical History", "Documents", "Appointments", "Notifications"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Summary" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Latest AI Summary</h3>
              {lastUpdated && (
                <span className="text-xs text-gray-500">
                  Updated: {lastUpdated.toLocaleString()}
                </span>
              )}
            </div>

            {aiSummary ? (
              <SummaryDisplay summary={aiSummary} alerts={criticalAlerts} hideTitle />
            ) : (
              <SummaryDisplay
                summary={`Blood pressure improving. Medication compliance excellent. No adverse reactions.
    
                Monitor blood pressure weekly. Schedule follow-up in 3 months`}
                alerts={[]}
                hideTitle
              />
            )}
          </div>

          <VitalSignsTrend />
        </div>
      )}

      {activeTab === "Medical History" && (
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Medical History</h3>
          <MedicalHistory />
        </div>
      )}

      {activeTab === "Documents" && (
        <Documents />
      )}

      {activeTab === "Appointments" && (
        <AppointmentsSection />
      )}

      {activeTab === "Notifications" && <PatientAlerts />}
    </div>
  );
};

export default PatientInfo;
