// src/pages/PatientsList.jsx
import React, { useMemo, useState } from "react";
import { Plus, Search, Filter, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialPatients = [
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
  Critical: "border-red-400 text-red-600",
  Stable: "border-green-400 text-green-600",
  Active: "border-blue-400 text-blue-600",
  Discharged: "border-gray-400 text-gray-500",
};

// --- search helpers ---
const normalize = (val) => String(val ?? "").toLowerCase().trim();

const matchesQuery = (patient, query) => {
  if (!query) return true;
  const q = normalize(query);
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  const haystack = [
    patient.id,
    patient.name,
    patient.doctor,
    patient.status,
    patient.condition,
    patient.contact,
    patient.email,
    patient.gender,
    patient.age,
  ]
    .map(normalize)
    .join(" | ");

  return tokens.every((t) => haystack.includes(t));
};

const PatientsList = () => {
  const navigate = useNavigate();

  // data state
  const [allPatients, setAllPatients] = useState(initialPatients);

  // search state
  const [query, setQuery] = useState("");

  // modal + form state
  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    status: "Active",
    condition: "",
    doctor: "",
    lastVisit: "",
    nextAppointment: "",
  });

  const filteredPatients = useMemo(
    () => allPatients.filter((p) => matchesQuery(p, query)),
    [query, allPatients]
  );

  // dynamic stats from allPatients
  const counts = useMemo(() => {
    const base = { Total: allPatients.length, Active: 0, Critical: 0, Stable: 0, Discharged: 0 };
    for (const p of allPatients) {
      if (base[p.status] !== undefined) base[p.status] += 1;
    }
    return base;
  }, [allPatients]);

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
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
        >
          <Plus size={18} /> Add New Patient
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className={`p-4 bg-white rounded-xl shadow text-center border`}>
          <p className="text-2xl font-bold">{counts.Total}</p>
          <p className="text-gray-800 text-sm">Total Patients</p>
        </div>
        <div className={`p-4 bg-white rounded-xl shadow text-center border ${borderColors.Active}`}>
          <p className="text-2xl font-bold">{counts.Active}</p>
          <p className="text-blue-700 text-sm">Active</p>
        </div>
        <div className={`p-4 bg-white rounded-xl shadow text-center border ${borderColors.Critical}`}>
          <p className="text-2xl font-bold">{counts.Critical}</p>
          <p className="text-red-700 text-sm">Critical</p>
        </div>
        <div className={`p-4 bg-white rounded-xl shadow text-center border ${borderColors.Stable}`}>
          <p className="text-2xl font-bold">{counts.Stable}</p>
          <p className="text-green-700 text-sm">Stable</p>
        </div>
        <div className={`p-4 bg-white rounded-xl shadow text-center border ${borderColors.Discharged}`}>
          <p className="text-2xl font-bold">{counts.Discharged}</p>
          <p className="text-gray-500 text-sm">Discharged</p>
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        {/* Search + Filter */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow w-full md:w-1/3">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search patients by name, ID, status, doctor..."
              className="w-full outline-none text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl shadow-sm">
            <Filter size={18} /> Status: All
          </button>
        </div>

        {/* Results meta */}
        <div className="text-xs text-gray-500 mb-2">
          Showing {filteredPatients.length} of {allPatients.length} patients
          {query ? ` for "${query}"` : ""}
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
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-gray-500">
                    No patients found. Try a different search.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent row navigation
                        }}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                      >
                        ⋮
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding new patient */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Patient ID"
                className="border p-2 rounded"
                value={newPatient.id}
                onChange={(e) => setNewPatient({ ...newPatient, id: e.target.value })}
              />
              <input
                type="text"
                placeholder="Name"
                className="border p-2 rounded"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Age"
                className="border p-2 rounded"
                value={newPatient.age}
                onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
              />
              <input
                type="text"
                placeholder="Gender"
                className="border p-2 rounded"
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
              />
              <input
                type="text"
                placeholder="Contact"
                className="border p-2 rounded col-span-2"
                value={newPatient.contact}
                onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded col-span-2"
                value={newPatient.email}
                onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Condition"
                className="border p-2 rounded col-span-2"
                value={newPatient.condition}
                onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
              />
              <input
                type="text"
                placeholder="Doctor"
                className="border p-2 rounded"
                value={newPatient.doctor}
                onChange={(e) => setNewPatient({ ...newPatient, doctor: e.target.value })}
              />
              <select
                className="border p-2 rounded"
                value={newPatient.status}
                onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })}
              >
                <option>Active</option>
                <option>Critical</option>
                <option>Stable</option>
                <option>Discharged</option>
              </select>
              <input
                type="date"
                placeholder="Last Visit"
                className="border p-2 rounded"
                value={newPatient.lastVisit}
                onChange={(e) => setNewPatient({ ...newPatient, lastVisit: e.target.value })}
              />
              <input
                type="date"
                placeholder="Next Appointment"
                className="border p-2 rounded"
                value={newPatient.nextAppointment}
                onChange={(e) => setNewPatient({ ...newPatient, nextAppointment: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newPatient.id.trim() || !newPatient.name.trim()) {
                    alert("ID and Name are required.");
                    return;
                  }
                  // Basic duplicate ID check
                  if (allPatients.some((p) => p.id === newPatient.id.trim())) {
                    alert("A patient with this ID already exists.");
                    return;
                  }
                  setAllPatients([...allPatients, { ...newPatient }]);
                  setShowForm(false);
                  setNewPatient({
                    id: "",
                    name: "",
                    age: "",
                    gender: "",
                    contact: "",
                    email: "",
                    status: "Active",
                    condition: "",
                    doctor: "",
                    lastVisit: "",
                    nextAppointment: "",
                  });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsList;