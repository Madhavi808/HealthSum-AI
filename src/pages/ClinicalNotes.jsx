import { useState, useEffect } from "react";
import Header from "../components/ClinicianNotes/Header";
import RecorderSection from "../components/ClinicianNotes/RecorderSection";
import ClinicalNote from "../components/ClinicianNotes/ClinicalNote";
import PatientSnapshot from "../components/ClinicianNotes/PatientSnapshot";

export default function ClinicianNotes() {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [transcript, setTranscript] = useState("Transcript appears here");
  const [status, setStatus] = useState("idle");
  const [useContext, setUseContext] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    summary: "",
    complaints: [],
    history: [],
    pastHistory: [],
    medications: [],
    allergies: [],
    assessment: "",
    plan: [],
    followup: [],
    investigations: [],
    referrals: []
  });

  // Hardcoded transcript (same as before)
  const SAMPLE_TRANSCRIPT = `Doctor (Dr. Smith): Good morning, Ms. Chen. I’m Dr. Smith. How can I help you today?

Patient (Ms. Chen): Good morning, doctor. I’ve been having chest discomfort and shortness of breath for a few days, and it seems to be getting worse when I climb stairs or lie down.

Doctor: I’m sorry to hear you’re dealing with that. When did you first notice these symptoms?

Patient: About three days ago. At first it was just a mild pressure feeling after I walked, but last night it also woke me up when I was lying flat.

Doctor: Any other symptoms? Cough? Fever? Swelling in your legs? Palpitations?

Patient: I have a mild cough, no fever. My ankles, especially the right one, are a bit swollen by evening. And sometimes I feel my heart racing.

Doctor: Have you had chest pain? Any radiating pain to your arm or jaw?

Patient: Yes, occasionally a tight pain in the left side of my chest, especially when I exert myself. It doesn’t go to the jaw or arm, though.

Doctor: Do you have any history of heart disease, hypertension, or diabetes? Do you smoke?

Patient: I have high blood pressure, yes. I’m on medication for that. No diabetes. I used to smoke, but I quit two years ago.

Doctor: Any allergies to medications? What medications are you currently taking?

Patient: I’m allergic to penicillin. Current meds: lisinopril 20 mg daily, atorvastatin 10 mg daily. Also, occasionally over‑the‑counter ibuprofen for joint pain.

Doctor: How about your diet, physical activity, and family history?

Patient: I try to eat reasonably, though I’ve had more salty food lately. I walk most days, though climbing stairs is harder now. My father had a heart attack in his 50s; my mother has high cholesterol.

Doctor: Good. I’d like to run some tests: ECG, chest X‑ray, blood work including troponin levels, and an echocardiogram if needed. In the meantime, I’ll start you on a low dose of a beta‑blocker to help ease the workload on your heart, and a diuretic to reduce swelling. Also, reduce salt intake, elevate your legs when sitting, and avoid strenuous activity.

Patient: Thank you, doctor. When should I come back?

Doctor: I’ll send you for the tests today. Let’s schedule a follow‑up in two days to review results. If symptoms worsen (e.g., more shortness of breath, more swelling, chest pain radiating), go to emergency sooner.

Patient: Understood. Thank you.`;

  // Fallback data JSON (same as before)
  const FALLBACK_DATA = {
    presenting_complaint:
      "Chest discomfort and shortness of breath, especially on exertion and when lying flat.",
    history_of_present_illness:
      "Ms. Chen has experienced an acute exacerbation ...",
    past_medical_history: "Hypertension and hyperlipidemia; no history of diabetes.",
    medications:
      "Lisinopril 20 mg daily, Atorvastatin 10 mg daily, and occasionally ibuprofen for joint pain.",
    allergies: "Allergic to penicillin.",
    topics:
      '[{"value":"Chest discomfort"},{"value":"Shortness of breath"},{"value":"Hypertension"},{"value":"Hyperlipidemia"},{"value":"Family history of heart disease"}]',
    assessment_diagnosis_investigations:
      '[{"value":"Dyspnea on exertion"},{"value":"Chest discomfort"},{"value":"Hypertension"},{"value":"Hyperlipidemia"},{"value":"Viral URI"}]',
    referrals: "",
    plan: "Interventions have included ...",
    follow_up: "Two days",
    alerts: '[{"value":"Allergic to penicillin"}]',
    context_from_prior_notes:
      "Ms. Chen is a former smoker ... now finds climbing stairs difficult."
  };

  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleRecordToggle = () => {
    if (!isRecording) {
      setStatus("recording...");
      setIsRecording(true);
      setTime(0);
      setTranscript("Transcript appears here");
    } else {
      setStatus("stopped");
      setIsRecording(false);
      setTranscript(SAMPLE_TRANSCRIPT);
    }
  };

  // ---- Autofill with 20s timeout and loader ----
  const handleAutofill = async () => {
    if (!useContext) {
      alert("Please check 'Consent obtained' before autofill.");
      return;
    }

    setLoading(true);

    // Timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 20000) // 20s
    );

    try {
      const response = await Promise.race([
        fetch("https://defaultbcc5004c3e5e43cd8dee4a6c2de3b1.12.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/81681defd69f4b14a588b986cfe83f15/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ReDJPwUsg5UIcz2vWjrckAdSeYkA5k9ztGJlZ58RpDQ", { method: "POST" }),
        timeoutPromise
      ]);

      if (!response || !response.ok) throw new Error("Backend error");

      const data = await response.json();

      const parsedTopics = data.topics ? JSON.parse(data.topics) : [];
      const parsedInvestigations = data.assessment_diagnosis_investigations
        ? JSON.parse(data.assessment_diagnosis_investigations)
        : [];

      setFormData((prev) => ({
        ...prev,
        summary: data.presenting_complaint || "",
        complaints: parsedTopics.map((t) => t.value),
        history: [data.history_of_present_illness || ""],
        assessment: parsedInvestigations.map((i) => i.value).join(", "),
        plan: [data.plan || ""],
        followup: [data.follow_up || ""],
        investigations: parsedInvestigations.map((i) => i.value),
        referrals: data.referrals ? [data.referrals] : [],
        pastHistory: [data.past_medical_history || ""],
        medications: [data.medications || ""],
        allergies: [data.allergies || ""],
      }));
    } catch (err) {
      console.warn("Backend failed or timeout, using fallback:", err);

      const parsedTopics = JSON.parse(FALLBACK_DATA.topics);
      const parsedInvestigations = JSON.parse(
        FALLBACK_DATA.assessment_diagnosis_investigations
      );

      setFormData({
        summary: FALLBACK_DATA.presenting_complaint,
        complaints: parsedTopics.map((t) => t.value),
        history: [FALLBACK_DATA.history_of_present_illness],
        assessment: parsedInvestigations.map((i) => i.value).join(", "),
        plan: [FALLBACK_DATA.plan],
        followup: [FALLBACK_DATA.follow_up],
        investigations: parsedInvestigations.map((i) => i.value),
        referrals: FALLBACK_DATA.referrals ? [FALLBACK_DATA.referrals] : [],
        pastHistory: [FALLBACK_DATA.past_medical_history],
        medications: [FALLBACK_DATA.medications],
        allergies: [FALLBACK_DATA.allergies],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-6 min-h-screen relative">
      {/* Loader overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          <span className="ml-3 text-blue-600 font-medium">Loading...</span>
        </div>
      )}

      <div className="flex-1 space-y-4">
        <Header
          onRecordToggle={handleRecordToggle}
          isRecording={isRecording}
          time={time}
          onAutofill={handleAutofill}
          useContext={useContext}
          setUseContext={setUseContext}
        />
        <RecorderSection transcript={transcript} status={status} />
        <ClinicalNote formData={formData} setFormData={setFormData} />
      </div>
      <PatientSnapshot />
    </div>
  );
}
