// components/KeywordInput.tsx
import { useState } from "react";

const KeywordInput = ({ value = [], onChange }: any) => {
  const [input, setInput] = useState("");

  const addKeyword = () => {
    if (!input.trim()) return;
    onChange([...value, input.trim()]);
    setInput("");
  };

  const removeKeyword = (i: number) => {
    onChange(value.filter((_: any, idx: number) => idx !== i));
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
          placeholder="Add keyword"
        />
        <button
          type="button"
          onClick={addKeyword}
          className="px-3 text-white bg-black"
        >
          +
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((k: string, i: number) => (
          <span
            key={i}
            className="flex gap-1 px-2 py-1 text-xs text-white bg-gray-700"
          >
            {k}
            <button onClick={() => removeKeyword(i)}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordInput;
