import { useState } from "react";

export default function TagInput({ label, tags, setTags }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (input.trim() !== "") {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, i) => (
          <span key={i} className="px-2 py-1 bg-gray-100 rounded-lg text-sm">{tag}</span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded-lg p-1 flex-grow"
          placeholder="Add..."
        />
        <button onClick={addTag} className="px-3 py-1 bg-transparent border rounded-lg">
          + Add
        </button>
      </div>
    </div>
  );
}
