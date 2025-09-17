import TagInput from "./TagInput";

export default function ClinicalNote({ formData, setFormData }) {
  const addPresetTag = (field, value) => {
    if (!formData[field].includes(value)) {
      setFormData({ ...formData, [field]: [...formData[field], value] });
    }
  };

  return (
    <section className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="font-semibold mb-3 text-lg">Clinical Note</h3>

      {/* Patient Summary */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Patient Summary</label>
        <textarea
          className="w-full border rounded-lg p-2 text-sm focus:ring focus:ring-blue-200"
          rows={2}
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
        />
        
      </div>

      {/* Complaints & History */}
      <div className="grid grid-cols-2 gap-4">
        <TagInput
          label="Presenting Complaint"
          tags={formData.complaints}
          setTags={(tags) => setFormData({ ...formData, complaints: tags })}
        />
        <TagInput
          label="History of Present Illness"
          tags={formData.history}
          setTags={(tags) => setFormData({ ...formData, history: tags })}
        />
      </div>

      {/* Past History / Medications / Allergies */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Past Medical History */}
        <div>
          <label className="block text-sm font-semibold mb-2">Past Medical History</label>
          <div className="border rounded-lg p-3 shadow-sm">
            
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => addPresetTag("pastHistory", "HTN")}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs hover:bg-purple-200"
              >
                + HTN
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.pastHistory.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Medications */}
        <div>
          <label className="block text-sm font-semibold mb-2">Medications</label>
          <div className="border rounded-lg p-3 shadow-sm">
            
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => addPresetTag("medications", "Med")}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200"
              >
                + Med
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.medications.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Allergies */}
          <div>
            <label className="block text-sm font-semibold mb-2">Allergies</label>
            <div className="border rounded-lg p-3 shadow-sm">
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => addPresetTag("allergies", "Allergy")}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs hover:bg-red-200"
                >
                  + Allergy
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.allergies.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-red-200 text-red-700 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
      </div>

      {/* Assessment */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Assessment / Diagnosis</label>
        <textarea
          className="w-full border rounded-lg p-2 text-sm focus:ring focus:ring-blue-200"
          rows={2}
          value={formData.assessment}
          onChange={(e) => setFormData({ ...formData, assessment: e.target.value })}
        />
      </div>

      {/* Plan & Follow-up */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TagInput
          label="Plan"
          tags={formData.plan}
          setTags={(tags) => setFormData({ ...formData, plan: tags })}
        />
        <TagInput
          label="Follow-up"
          tags={formData.followup}
          setTags={(tags) => setFormData({ ...formData, followup: tags })}
        />
      </div>

      {/* Investigations & Referrals */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TagInput
          label="Investigations"
          tags={formData.investigations}
          setTags={(tags) => setFormData({ ...formData, investigations: tags })}
        />
        <TagInput
          label="Referrals"
          tags={formData.referrals}
          setTags={(tags) => setFormData({ ...formData, referrals: tags })}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-6">
        {/* Left side buttons */}
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-full text-sm hover:bg-gray-200 bg-transparent border">
            Accept AI
          </button>
          <button className="px-4 py-2 rounded-full text-sm hover:bg-gray-200 bg-transparent border">
            Reject AI
          </button>
          
        </div>

        {/* Right side button */}
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
            Save Draft
          </button>
          <button className="px-5 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600">
            Finalize & Sign
          </button>
        </div>
      </div>
    </section>
  );
}
