import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const stats = [
  {
    title: 'Total Invoices',
    value: '24',
    icon: FileText,
    color: 'text-gray-400',
    bgColor: 'bg-white/5',
    borderColor: 'border-white/10',
  },
  {
    title: 'Paid',
    value: '21',
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-600/10',
    borderColor: 'border-green-300/30',
  },
  {
    title: 'Pending',
    value: '2',
    icon: Clock,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-600/10',
    borderColor: 'border-yellow-300/30',
  },
  {
    title: 'Overdue',
    value: '1',
    icon: AlertCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-600/10',
    borderColor: 'border-red-300/30',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(stat => (
        <div
          key={stat.title}
          className={`${stat.bgColor} border ${stat.borderColor} rounded-lg p-4`}
        >
          <div className="flex items-center gap-3">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <p className="text-white text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
