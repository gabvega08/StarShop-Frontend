interface EventCardProps {
  title: string;
  date: string;
  description: string;
}

export function EventCard({ title, date, description }: EventCardProps) {
  return (
    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-white">{title}</h3>
        <span className="text-sm text-purple-400">{date}</span>
      </div>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
  );
}
