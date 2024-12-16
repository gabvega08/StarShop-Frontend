import { FC } from "react";
import { LucideIcon } from "lucide-react";

interface InputProps {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  name: string;
  icon?: LucideIcon;
}

const Input: FC<InputProps> = ({
  label,
  id,
  type,
  placeholder,
  name,
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
        <input
          className={`w-full bg-custom-light-card-background text-white text-base p-3 pl-14 rounded-lg border-b-4 border-primary-purple placeholder:text-white `}
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
