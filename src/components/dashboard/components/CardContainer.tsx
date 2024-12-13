"use client";

import React, { FC, ReactNode } from "react";

// Define the types for CardContainer component props
interface CardContainerProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  title?: string;
  subtitle?: ReactNode;
  footer?: ReactNode;
}

const CardContainer: FC<CardContainerProps> = ({
  children,
  className,
  icon,
  title,
  subtitle,
  footer
}) => {
  return (
    <div className={`flex flex-col justify-end ${className}`}>
      {/* Header Section */}
      {(icon || title) && (
        <div
          className={`flex gap-2 items-center mb-2 pl-4 ${
            !icon && !title ? "h-[44px]" : ""
          }`}
        >
          {icon && <div>{icon}</div>}
          {title && (
            <h3 className="text-[20px] sm:text-[24px] lg:text-[30px] font-bold text-center text-background">
              {title}
            </h3>
          )}
        </div>
      )}

      {/* Body Section */}
      <div className="flex flex-col items-center px-4 pb-4 border-4 border-custom-light-card-border rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] max-h-[254px] h-screen">
        {subtitle && (
          <h4 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-2">
            {subtitle}
          </h4>
        )}
        {children}
      </div>

      {/* Footer Section */}
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
};

export default CardContainer;
