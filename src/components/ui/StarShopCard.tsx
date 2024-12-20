interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const StarShopCard = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={`flex flex-col bg-custom-light-wrapper-background items-center p-4 border-4 border-custom-light-card-border rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] h-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default StarShopCard;
