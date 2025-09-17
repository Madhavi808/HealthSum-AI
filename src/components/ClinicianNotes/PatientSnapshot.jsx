export default function PatientSnapshot() {
  return (
    <aside className="w-80 space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold mb-2">Patient Snapshot</h4>
        <p>Name:Jane Doe</p>
        <p>DOB: 1972-05-14</p>
        <p>Sex: Female</p>
        <p>Last visit:   2025-06-22</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold mb-2">Context from prior notes</h4>
        <div className="mb-2">
          <p className="font-small text-grey-60">Active meds (latest)</p>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
            Lisinopril 20 mg PO daily
          </span>
        </div>
        <div className="mb-2">
          <p className="font-small text-grey-60">Allergies</p>
          <span className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-sm">
            Penicillin
          </span>
        </div>
        <div className="mb-2">
          <p className="font-small text-grey-60">Problem list (derived)</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-gray-100 rounded-lg text-sm">Dyspnea</span>
            <span className="px-2 py-1 bg-gray-100 rounded-lg text-sm">Hypertension</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold mb-2">Alerts</h4>
        <ul className="list-disc ml-4 text-sm">
          <li className="text-orange-600">Allergy: Penicillin</li>
          <li className="text-red-600">BP trending high last 3 visits</li>
          <li className="text-blue-600">Follow-up due in 2 days</li>
        </ul>
      </div>
    </aside>
  );
}
