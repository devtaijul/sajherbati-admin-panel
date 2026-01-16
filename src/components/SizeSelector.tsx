interface SizeSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  sizes?: string[];
}

const DEFAULT_SIZES = ["38", "40", "42", "44", "46"];

const SizeSelector = ({
  value = [],
  onChange,
  sizes = DEFAULT_SIZES,
}: SizeSelectorProps) => {
  return (
    <div>
      <div className="label">
        <span className="label-text">Available Body Sizes</span>
      </div>

      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <label key={size} className="gap-2 cursor-pointer label">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={value.includes(size)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...value, size]);
                } else {
                  onChange(value.filter((s) => s !== size));
                }
              }}
            />
            <span className="ml-1 font-bold label-text dark:text-white">
              {size}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
