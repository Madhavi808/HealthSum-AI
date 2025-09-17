// src/components/Sidebar.jsx
import { Home, Users, Calendar, FileText, BarChart, Settings, Bot } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Patients", icon: <Users size={20} /> },
    // { name: "AI Assistant", icon: <Bot size={20} /> },
    // { name: "Appointments", icon: <Calendar size={20} /> },
    // { name: "Reports", icon: <FileText size={20} /> },
    // { name: "Analytics", icon: <BarChart size={20} /> },
    // { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-4 hidden md:block">
      {/* <h1 className="text-xl font-bold mb-6 text-blue-600 text-center ">HealthSum AI</h1> */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <img 
          src="/final-logo.jpeg"  // put your PNG inside public/logo.png
          alt="HealthSum AI Logo" 
          className="w-8 h-8"
        />
        <h1 className="text-xl font-bold text-blue-600">HealthSum AI</h1>
      </div>
      <ul className="space-y-3">
        <li>
          <Link 
            to="/" 
            className="block px-3 py-2 rounded hover:bg-gray-200 flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer"
          ><Home size={20} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/patients" 
            className="block px-3 py-2 rounded hover:bg-gray-200 flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer"
          ><Users size={20} />
            Patients
          </Link>
        </li>
        <li>
          <Link 
            to="/uploads" 
            className="block px-3 py-2 rounded hover:bg-gray-200 flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer"
          ><FileText size={20} />
            AI Summarize
          </Link>
        </li>
        <li>
          <Link 
            to="/clinical-notes" 
            className="block px-3 py-2 rounded hover:bg-gray-200 flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer"
          ><Bot size={20} />
            AI Scribe
          </Link>
        </li>
      </ul>
      {/* <nav className="space-y-3">
        <div
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer"
          >
          <Home size={20} />
          <span>Dashboard</span>
        </div>
        <div
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer"
          >
          <Users size={20} />
          <span>Patients</span>
        </div>
      </nav> */}
    </aside>
  );
}
