// src/pages/Dashboard.jsx
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PatientsList from "../components/PatientsList";

export default function Patient() {
  return (
    // <div className="flex min-h-screen bg-gray-50">
    //   {/* Sidebar */}
    //   <Sidebar />

    //   {/* Main Content */}
    //   <div className="flex-1 flex flex-col">
    //     <Navbar />

    //     <main className="p-6 space-y-6">
          <PatientsList />
    //     </main>
    //   </div>
    // </div>
  );
}
