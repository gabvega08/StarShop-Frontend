interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  borderColor: string;
}

const StatsCard = ({ title, value, subtitle, borderColor }: StatsCardProps) => {
  return (
    <div className="bg-[#170d243b] rounded-xl p-5 border border-[#1a1c3d] relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h2 className="text-4xl font-bold mt-2 text-white">{value}</h2>
          <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
        </div>
        <div className="bg-[#1a1c3d] p-2 rounded-lg"></div>
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full h-1 ${borderColor}`}
      ></div>
    </div>
  );
};

export default StatsCard;
