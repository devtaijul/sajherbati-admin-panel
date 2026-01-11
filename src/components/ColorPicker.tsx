// components/ColorPicker.tsx
const ColorPicker = ({ register }: any) => {
  return (
    <div className="flex items-center gap-3">
      <input type="color" {...register} className="w-10 h-10 border-none" />
      <input
        type="text"
        {...register}
        placeholder="#000000"
        className="input"
      />
    </div>
  );
};

export default ColorPicker;
