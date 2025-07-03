import { Button } from '@/shared/components/ui/button';
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
  linkIcon = <ChevronRight className="text-xs" />,
}: CardProps) {
  return (
    <div className="p-6 rounded-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white border-opacity-5 bg-transparent bg-opacity-5">
      <div className="flex items-center mb-4">
        <div className="text-purple-400 mr-3 mt-1">{icon}</div>
        <div>
          <h2 className="text-xs lg:text-base font-semibold text-white">
            {title}
          </h2>
        </div>
      </div>
      <p className="text-gray-300 mb-2 text-xs lg:text-sm">{description}</p>
      <p className="text-gray-300 mb-6 text-xs lg:text-sm">{longDescription}</p>

      <div className="w-full">
        <Link href={linkHref}>
          <Button
            variant={`${isPrimary ? 'primary' : 'transparent'}`}
            rightIcon={linkIcon}
            className="text-xs lg:text-sm"
          >
            {linkText}
          </Button>
        </Link>
      </div>
    </div>
  );
}
