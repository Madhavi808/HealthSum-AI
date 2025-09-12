import React from "react";

const MedicalHistory = () => {
  const history = [
    {
      color: "bg-blue-500",
      condition: "Hypertension",
      diagnosed: "January 2025",
      status: "Well controlled with medication",
    },
    {
      color: "bg-yellow-400",
      condition: "Type 2 Diabetes",
      diagnosed: "March 2019",
      status: "Monitoring required",
    },
    {
      color: "bg-green-500",
      condition: "High Cholesterol",
      diagnosed: "June 2018",
      status: "Improved with lifestyle changes",
    },
  ];

  return (
    <div className="py-4">
      {/* <h3 className="font-semibold text-lg mb-6">Medical History</h3> */}

      {/* <div className="relative pl-6"> */}
        {/* Vertical Line */}
        {/* <div className="absolute left-2 top-0 bottom-0 w-1 bg-gray-200"></div> */}

        {/* Items */}
        {history.map((item, index) => (
          <div key={index} className="relative mb-8">
            {/* Colored marker segment */}
            <div
              className={`absolute left-2 w-1 h-full ${item.color}`}
              style={{ borderRadius: "2px" }}
            ></div>

            {/* Content */}
            <div className="ml-6">
              <p className="font-bold text-gray-900">{item.condition}</p>
              <p className="text-sm text-gray-600 font-semibold">
                Diagnosed: {item.diagnosed}
              </p>
              <p className="text-sm text-gray-500">Status: {item.status}</p>
            </div>
          </div>
        ))}
      </div>
    // </div>
  );
};

export default MedicalHistory;
