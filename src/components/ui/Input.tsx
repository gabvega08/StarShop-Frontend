import { FC } from "react";
import { LucideIcon } from "lucide-react";

interface InputProps {
  label?: string;
  id: string;
  type: string;
  placeholder?: string;
  name: string;
  icon?: LucideIcon;
  className?: string;
  bgColor?: string;
  borderColor?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  label,
  id,
  type,
  placeholder,
  name,
  icon: Icon,
  className,
  bgColor = "bg-[#0E0E1B]", 
  borderColor = "border-[1px] border-[rgba(168,85,247,0.2)]", 
  value,
  onChange,
}) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <label className="uppercase font-bold text-white text-lg" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative w-full">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        )}
        <input
          className={`w-full ${bgColor} ${borderColor} text-inherit text-base p-3 pl-3 rounded-md outline-none focus:border-primary-purple focus:ring-0 transition placeholder:text-[#9CA3AF] ${className}`}
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
