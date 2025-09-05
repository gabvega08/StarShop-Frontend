import Link from 'next/link';
import { CtaButton } from '../constants/cta';

interface CtaButtonsProps {
  buttons: CtaButton[];
}

export function CtaButtons({ buttons }: CtaButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {buttons.map((button, index) => (
        <Link key={index} href={button.href} className={button.className}>
          {button.variant === 'primary' ? (
            <span className="relative z-10 flex items-center">
              {button.text}
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          ) : (
            button.text
          )}
          {button.variant === 'primary' && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"></div>
          )}
        </Link>
      ))}
    </div>
  );
}
