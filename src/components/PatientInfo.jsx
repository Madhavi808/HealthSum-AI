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

const PatientInfo = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Summary");
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
        {["Summary", "Medical History", "Documents", "Appointments", "Notification"].map((tab) => (
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
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-2">Latest AI Summary</h3>
            <div className="bg-blue-50 p-3 rounded mb-2">
              <p className="font-medium text-blue-700">Key Findings</p>
              <ul className="text-sm text-blue-600 list-disc pl-4">
                <li>Blood pressure improving</li>
                <li>Medication compliance excellent</li>
                <li>No adverse reactions</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <p className="font-medium text-green-700">Recommendations</p>
              <ul className="text-sm text-green-600 list-disc pl-4">
                <li>Continue current medication</li>
                <li>Schedule follow-up in 3 months</li>
                <li>Monitor blood pressure weekly</li>
              </ul>
            </div>
          </div>
          <VitalSignsTrend />
            {/* <PatientAlerts /> */}
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

      {activeTab === "Notification" && <PatientAlerts />}
    </div>
  );
};

export default PatientInfo;
