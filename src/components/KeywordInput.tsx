// components/KeywordInput.tsx
import { useState } from "react";

const KeywordInput = ({
  value = [],
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) => {
  const [input, setInput] = useState("");

  const addKeyword = () => {
    if (!input.trim()) return;
    onChange([...value, input.trim()]);
    setInput("");
  };

  const removeKeyword = (i: number) => {
    onChange(value.filter((_: string, idx: number) => idx !== i));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      if (!input.trim()) return;
      onChange([...value, input.trim()]);
      setInput("");
    }
  };

  return (
    <div className="w-full p-3 overflow-hidden bg-white rounded-sm dark:bg-blackPrimary">
      <div className="flex w-full gap-2 border">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 w-full px-4 py-2 input dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary"
          placeholder="Add keyword"
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={addKeyword}
          className="px-3 text-white bg-black dark:bg-whiteSecondary dark:text-blackPrimary"
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
