// components/SwitchToggle.tsx
const SwitchToggle = ({ label, register }: any) => {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="dark:text-whiteSecondary text-blackPrimary">
        {label}
      </span>
      <input type="checkbox" {...register} className="hidden peer" />
      <div className="relative w-10 h-5 bg-gray-600 rounded-full peer-checked:bg-green-500">
        <div className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
      </div>
    </label>
  );
};

export default SwitchToggle;
