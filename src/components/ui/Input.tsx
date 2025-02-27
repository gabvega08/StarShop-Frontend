import { FC } from "react";
import { LucideIcon } from "lucide-react";

interface InputProps {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  name: string;
  icon?: LucideIcon;
  className?: string;
  labelClassName?: string;
  centered?: boolean;
  containerClassName?: string;
}

const Input: FC<InputProps> = ({
  label,
  id,
  type,
  placeholder,
  name,
  icon: Icon,
  className = "",
  labelClassName = "text-lg text-white",
  centered = true,
  containerClassName = "",
}) => {
  return (
    <div
      className={`
        flex flex-col 
        ${centered ? "items-center text-center" : "items-start text-left"} 
        space-y-2
        ${containerClassName}
      `}
    >
      <label
        htmlFor={id}
        className={`block mb-2 uppercase font-bold ${labelClassName}`}
      >
        {label}
      </label>
      <div className={`relative ${centered ? "w-full" : "w-full"}`}>
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        )}
        <input
          className={`w-full bg-custom-light-card-background text-white text-base p-3 ${
            Icon ? "pl-14" : "pl-3"
          } rounded-lg  ${className}`}
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
        />
      </div>
    </div>
  );
};

export default Input;
