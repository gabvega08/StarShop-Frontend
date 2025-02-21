import { FC } from "react";
import { LucideIcon } from "lucide-react";

interface SelectProps {
  label: string;
  id: string;
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: LucideIcon;
}

const Select: FC<SelectProps> = ({
  label,
  id,
  name,
  options,
  placeholder = "Select an option",
  icon: Icon,
}) => {
  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <label className="uppercase font-bold text-white text-lg" htmlFor={id}>
        {label}
      </label>
      <div className="relative w-full">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        )}
        <select
          className="w-full bg-custom-light-card-background text-white text-base p-3 pl-14 pr-3 rounded-lg appearance-none border-b-4 border-primary-purple focus:outline-none"
          id={id}
          name={name}
          defaultValue=""
        >
          <option value="" disabled className="text-gray-200">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
