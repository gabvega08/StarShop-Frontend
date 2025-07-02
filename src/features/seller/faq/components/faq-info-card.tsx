import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  longDescription: string;
  linkText: string;
  linkHref: string;
  isPrimary?: boolean;
  linkIcon?: React.ReactNode;
}

export default function FAQInfoCard({
  icon,
  title,
  description,
  longDescription,
  linkText,
  linkHref,
  isPrimary = false,
  linkIcon = <ChevronRight size={20} />,
}: CardProps) {
  const cardStyle =
    ' p-6 rounded-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white border-opacity-5 bg-transparent bg-opacity-5 ';
  const btnStyle =
    'flex items-center justify-between bg-transparent text-white py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-5 border border-white border-opacity-5 ';
  const primaryBtnStyle =
    'flex items-center justify-between bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700';
  return (
    <div className={cardStyle}>
      <div className="flex items-start mb-4">
        <div className="text-purple-400 mr-3 mt-1">{icon}</div>
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
      </div>
      <p className="text-gray-300 mb-2">{description}</p>
      <p className="text-gray-300 mb-6">{longDescription}</p>
      <Link href={linkHref} className={isPrimary ? primaryBtnStyle : btnStyle}>
        {linkText}
        {linkIcon}
      </Link>
    </div>
  );
}
