export default function RecorderSection({ transcript, status }) {
  return (
    <section className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <textarea
        className="w-full border rounded-lg p-2"
        rows={3}
        placeholder="Transcript appears here"
        value={transcript}
        readOnly
      />
      <p className="text-sm text-gray-500 mt-2">Recorder status: {status}</p>
    </section>
  );
}
