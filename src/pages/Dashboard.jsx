// src/pages/Dashboard.jsx
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import Appointments from "../components/Appointments";
import Alerts from "../components/Alerts";
import Uploads from "../components/Uploads";
import Timeline from "../components/Timeline";
// import QuickActions from "../components/QuickActions";

export default function Dashboard() {
  return (
    // <div className="flex min-h-screen bg-gray-50">
    //   {/* Sidebar */}
    //   <Sidebar />

    //   {/* Main Content */}
    //   <div className="flex-1 flex flex-col">
    //     <Navbar />

        // <main className="p-6 space-y-6">
        <div className="space-y-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <StatsCard title="Total Patients" value="25" />
            <StatsCard title="Upcoming Appointments" value="8" />
            <StatsCard title="Critical Patients" value="2" highlight />
            {/* <StatsCard title="New Reports Uploaded" value="12" /> */}
          </div>


 {/* <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6">
          <Appointments />
        </div>

        <div className="col-span-12 lg:col-span-5 space-y-6">
          <Alerts />
          <Uploads />
        </div>
</div> */}
          {/* Appointments + Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div className="lg:col-span-2">
              <Appointments />
            </div>
            
          </div>

          {/* Uploads + Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> 
            <Uploads />
            <Alerts />
            {/* <Timeline /> */}
          </div>
        </div>
        //   {/* Quick Actions */}
        //   {/* <QuickActions /> */}
        // {/* </main> */}
    //   {/* </div>
    // </div> */}
  );
}
