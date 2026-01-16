// *********************
// Role of the component: Select input component that displays the select input field
// Name of the component: SelectInput.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <InputWithLabel label="Select role"><SelectInput selectList={roles} /></InputWithLabel>
// Input parameters: roles: { value: string; label: string }[]
// Output: SelectInput component that displays the select input field
// *********************

import { nanoid } from "nanoid";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  selectList: { value: string; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

const SelectInput: React.FC<TextAreaProps> = ({
  selectList,
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full h-10 pl-3 pr-8 bg-white border border-gray-600 cursor-pointer dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary outline-0 dark:hover:border-gray-500 hover:border-gray-400"
    >
      {selectList &&
        selectList.map((item: { value: string; label: string }) => {
          const { value, label } = item;

          return (
            <option key={nanoid()} value={value}>
              {label}
            </option>
          );
        })}
    </select>
  );
};
export default SelectInput;
