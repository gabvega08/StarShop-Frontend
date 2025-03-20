"use client"

import { useEffect, useState } from "react";

interface SalesGoalProps {
  status: string;
  statusColor: string;
  textColor: string;
  title: string;
  subtitle: string;
  target: string;
  progress: number;
  thisMonth: string;
}

const SalesGoalCard: React.FC<SalesGoalProps> = ({
  status,
  statusColor,
  textColor,
  title,
  subtitle,
  target,
  progress,
  thisMonth,
}) => {
  const [progressWidth, setProgressWidth] = useState(0);
  useEffect(() => {
    setTimeout(() => setProgressWidth(progress), 500);
  }, [progress]);
  return (
    <>
      <main className="flex flex-col w-[363px] px-6 pt-6 pb-9  rounded-[8px] bg-[#13111E] p-[20px] border border-[#FFFFFF1A] shadow-[0px_0px_10px_0px_#ffffff1a]">
        <div
          style={{ background: statusColor }}
          className="px-[8px] py-[2px] mb-4 rounded-[4px] w-fit "
        >
          <p
            style={{ color: textColor }}
            className="text-[#60A5FA] font-normal text-xs "
          >
            {status}
          </p>
        </div>
        <h3 className="font-medium  text-[17px] mb-1">{title}</h3>
        <p className="text-[13px] text-[#ffff] font-normal opacity-60 mb-4">
          {subtitle}
        </p>
        <main className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between ">
            <p className="text-[13px] text-[#ffff] font-normal  opacity-60">
              Progress
            </p>
            <p className="text-[13px] text-[#ffff] font-normal">{progress}%</p>
          </div>
          <div className="h-[8px] bg-[#1F1D29] w-full rounded-full">
            <div
              style={{ width: `${progressWidth}%` }}
              className="h-full  bg-[#A855F7] rounded-full"
            ></div>
          </div>
          <div className="flex justify-between ">
            <p className="text-[13px] text-[#ffff] font-normal opacity-60">
              Target: {target}
            </p>
            <p className="text-[13px] text-[#ffff] font-normal opacity-60">
              {thisMonth}
            </p>
          </div>
        </main>

        <div className="flex justify-center items-center gap-2">
          <p className="text-[13px] text-[#ffff] font-medium">View Details</p>
          <img src="/icons/arrowRight.svg" alt="view-details arrow" />
        </div>
      </main>
    </>
  );
};

export default SalesGoalCard;
