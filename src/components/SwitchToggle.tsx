// components/SwitchToggle.tsx
const SwitchToggle = ({ label, register }: any) => {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer ">
      <span className="dark:text-whiteSecondary text-blackPrimary">
        {label}
      </span>

      <div className="relative">
        <input type="checkbox" {...register} className="sr-only peer" />

        <div className="relative h-6 transition-colors bg-gray-400 rounded-full w-11 peer-checked:bg-green-500 "></div>
        <div className="absolute w-4 h-4 transition-transform bg-white rounded-full peer-checked:left-0 left-1 top-1 peer-checked:translate-x-6 peer-checked:dark:bg-gray-900" />
      </div>
    </label>
  );
};

export default SwitchToggle;
