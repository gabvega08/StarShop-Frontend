interface BoundedProps {
  children: React.ReactNode;
  className?: string;
}

const Bounded = ({ children, className }: BoundedProps) => {
  return (
    <div className="min-h-screen space-y-24 text-white p-4 sm:p-6 lg:p-8">
      <div className={`max-w-screen-xl mx-auto px-4 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Bounded;
