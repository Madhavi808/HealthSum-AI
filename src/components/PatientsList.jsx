// src/pages/PatientsList.jsx
import React from "react";
import { Plus, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const patients = [
  {
    id: "P001",
    name: "John Doe",
    age: 45,
    gender: "Male",
    contact: "+1 (555) 123-4567",
    email: "john.doe@email.com",
    status: "Critical",
    condition: "Hypertension, Diabetes",
    doctor: "Dr. Smith",
    lastVisit: "2024-01-14",
    nextAppointment: "2024-01-19",
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    contact: "+1 (555) 234-5678",
    email: "jane.smith@email.com",
    status: "Stable",
    condition: "Annual Check-up",
    doctor: "Dr. Johnson",
    lastVisit: "2024-01-09",
    nextAppointment: "2024-02-09",
  },
  {
    id: "P003",
    name: "Robert Wilson",
    age: 67,
    gender: "Male",
    contact: "+1 (555) 345-6789",
    email: "robert.wilson@email.com",
    status: "Active",
    condition: "Arthritis",
    doctor: "Dr. Lee",
    lastVisit: "2024-01-04",
    nextAppointment: "2024-01-24",
  },
  {
    id: "P004",
    name: "Maria Garcia",
    age: 28,
    gender: "Female",
    contact: "+1 (555) 456-7890",
    email: "maria.garcia@email.com",
    status: "Stable",
    condition: "Pregnancy Care",
    doctor: "Dr. Brown",
    lastVisit: "2024-01-11",
    nextAppointment: "2024-02-14",
  },
  {
    id: "P005",
    name: "David Brown",
    age: 55,
    gender: "Male",
    contact: "+1 (555) 567-8901",
    email: "david.brown@email.com",
    status: "Discharged",
    condition: "Surgery Recovery",
    doctor: "Dr. Smith",
    lastVisit: "2024-01-07",
    nextAppointment: "2024-02-29",
  },
  {
    id: "P006",
    name: "Sarah Davis",
    age: 41,
    gender: "Female",
    contact: "+1 (555) 678-9012",
    email: "sarah.davis@email.com",
    status: "Active",
    condition: "Migraine Treatment",
    doctor: "Dr. Johnson",
    lastVisit: "2024-01-17",
    nextAppointment: "2024-01-21",
  },
];

// Status colors for badges
const statusColors = {
  Critical: "bg-red-100 text-red-600",
  Stable: "bg-green-100 text-green-600",
  Active: "bg-blue-100 text-blue-600",
  Discharged: "bg-gray-200 text-gray-600",
};

// Border colors for widgets
const borderColors = {
  Critical: "border-red-400",
  Stable: "border-green-400",
  Active: "border-blue-400",
  Discharged: "border-gray-400",
};


const PatientsList = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Patient Management</h1>
          <p className="text-gray-500 text-sm">
            Manage and view all patient records
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow">
          <Plus size={18} /> Add New Patient
        </button>
      </div>

      {/* Stats Widgets */}
     {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className={`p-4 bg-white rounded-xl shadow text-center border `}>
          <p className="text-2xl font-bold">6</p>
          <p className="text-gray-500 text-sm">Total Patients</p>
        </div>
        <div className={`p-4 bg-white rounded-xl shadow text-center border ${borderColors.Active}`}>
          <p className="text-2xl font-bold">2</p>
          <p className="text-gray-500 text-sm">Active</p>
        </div>
        <div className={`p-4 bg-white rounded-xl shadow text-center border ${borderColors.Critical}`}>
          <p className="text-2xl font-bold">1</p>
          <p className="text-gray-500 text-sm">Critical</p>
        </div>
        <div className={`p-4 bg-white rounded-xl shadow text-center border ${borderColors.Stable}`}>
          <p className="text-2xl font-bold">2</p>
          <p className="text-gray-500 text-sm">Stable</p>
        </div>
        <div className={`p-4 bg-white rounded-xl shadow text-center border ${borderColors.Discharged}`}>
          <p className="text-2xl font-bold">1</p>
          <p className="text-gray-500 text-sm">Discharged</p>
        </div>
      </div>


      {/* Patient List */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        {/* Search + Filter */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow w-1/3">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full outline-none text-sm"
            />
          </div>
          <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl shadow-sm">
            <Filter size={18} /> Status: All
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-gray-600 font-medium">Patient</th>
                <th className="p-3 text-gray-600 font-medium">Contact</th>
                <th className="p-3 text-gray-600 font-medium">Status</th>
                <th className="p-3 text-gray-600 font-medium">Condition</th>
                <th className="p-3 text-gray-600 font-medium">Doctor</th>
                <th className="p-3 text-gray-600 font-medium">Last Visit</th>
                <th className="p-3 text-gray-600 font-medium">Next Appointment</th>
                <th className="p-3 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/patient/${p.id}`)}
                >
                  <td className="p-3">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-gray-500">
                      ID: {p.id} • {p.age}y, {p.gender}
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    <div>📞 {p.contact}</div>
                    <div className="text-gray-500">✉️ {p.email}</div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[p.status]}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3">{p.condition}</td>
                  <td className="p-3">{p.doctor}</td>
                  <td className="p-3">{p.lastVisit}</td>
                  <td className="p-3">{p.nextAppointment}</td>
                  <td className="p-3">
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientsList;
