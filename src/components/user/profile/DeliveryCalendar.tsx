import { Calendar, Clock, LucideIcon } from 'lucide-react';

interface DeliveryCalendarProps {
  type: string;
  date: string;
}

const DeliveryCalendar = ({ 
  type,
  date,
}: DeliveryCalendarProps) => {
  const getIconAndColor = () => {
    switch (type.toLowerCase()) {
      case 'package arriving':
        return { icon: Calendar, color: 'blue' };
      case 'expected delivery':
        return { icon: Clock, color: 'green' };
      default:
        return { icon: Calendar, color: 'blue' };
    }
  };

  const { icon: Icon, color } = getIconAndColor();

  return (
    <div className="flex items-center p-4 rounded-lg bg-[#1a1b1e]/30">
      <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-${color}-900/30`}>
        <Icon className={`text-${color}-400 w-5 h-5`} />
      </div>

      <div className="ml-4 flex-1">
        <p className="text-base font-medium text-white">{type}</p>
        <div className="space-y-2 mt-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">{date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCalendar; 