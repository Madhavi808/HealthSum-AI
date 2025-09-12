import { Activity, Heart, Thermometer, Scale } from "lucide-react";

const VitalSignsTrend = () => {
  const signs = [
    {
      icon: <Activity className="text-blue-600" size={18} />,
      label: "Blood Pressure",
      value: "120/80 mmHg",
      trend: "↘",
    },
    {
      icon: <Heart className="text-red-600" size={18} />,
      label: "Heart Rate",
      value: "72 bpm",
      trend: "–",
    },
    {
      icon: <Thermometer className="text-orange-600" size={18} />,
      label: "Temperature",
      value: "98.6°F",
      trend: "–",
    },
    {
      icon: <Scale className="text-purple-600" size={18} />,
      label: "Weight",
      value: "165 lbs",
      trend: "↗",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <h3 className=" font-semibold mb-4 flex items-center gap-2">
        {/* <Activity className="text-blue-600" size={20} /> */}
        Vital Signs Trend
      </h3>

      <div className="divide-y">
        {signs.map((s, i) => (
          <div key={i} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2">
              {s.icon}
              <span className="text-gray-700">{s.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{s.value}</span>
              <span className="text-gray-400">{s.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VitalSignsTrend;
