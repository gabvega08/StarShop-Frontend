import { Check } from 'lucide-react';
import { ProfileCardProps } from '../types';

export const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  description,
  features,
  icon,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`
        relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
        ${
          isSelected
            ? 'border-sidebarActive shadow-lg shadow-sidebarActive/20'
            : 'border-sidebarBorder hover:border-sidebarActive hover:bg-sidebarActive/5'
        }
      `}
      onClick={onSelect}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div
          className={`
          p-3 rounded-full border-2
          ${isSelected ? 'border-sidebarActive bg-sidebarActive/20' : 'border-sidebarBorder'}
        `}
        >
          {icon}
        </div>

        <h3 className="text-xl font-bold text-white">{title}</h3>

        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>

        <div className="space-y-2 w-full">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-sidebarActive rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};
