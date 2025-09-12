// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Patient from "./pages/Patient"; 
import Dashboard from "./pages/Dashboard";
import PatientInfo from "./components/PatientInfo";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar"; 

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar content here */}
        {/* Main content */}
        <div className="flex-1">
          <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar />
          
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                  <Navbar />
          
                  <main className="p-6 space-y-6">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/patients" element={<Patient />} />
                      <Route path="/patient/:id" element={<PatientInfo />} />
                    </Routes>
                  </main>
                </div>
              </div>

        </div>
      </div>
    </Router>
  );
}
export default App;
