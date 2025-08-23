import { Benefit } from '../constants/cta';

interface BenefitsListProps {
  benefits: Benefit[];
}

export function BenefitsList({ benefits }: BenefitsListProps) {
  return (
    <div className="space-y-4 mb-10">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-center space-x-3">
          <span className="text-2xl">{benefit.icon}</span>
          <span className="text-lg text-gray-200">{benefit.text}</span>
        </div>
      ))}
    </div>
  );
}
