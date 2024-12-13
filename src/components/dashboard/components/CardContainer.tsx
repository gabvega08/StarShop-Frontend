"use client";

import React, { FC, ReactNode } from "react";

// Define the types for CardContainer component props
interface CardContainerProps {
  children: ReactNode;
  className?: string;
}

// Define the types for Header component props
interface CardContainerHeaderProps {
  icon?: ReactNode;
  title?: string;
}

// Define the types for Body and Footer component props
interface CardContainerSectionProps {
  children: ReactNode;
}

interface CardBodySectionProps {
  children: ReactNode;
}

// Define types for the Body subcomponents
interface CardBodyWithSubTitle extends FC<CardContainerSectionProps> {
  SubTitle: FC<CardBodySectionProps>;
}

const CardContainer: FC<CardContainerProps> & {
  Header: FC<CardContainerHeaderProps>;
  Body: CardBodyWithSubTitle;
  Footer: FC<CardContainerSectionProps>;
} = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

// Subcomponents
const Header: FC<CardContainerHeaderProps> = ({ icon, title }) => {
  return (
    <div
      className={`flex gap-2 items-center mb-2 pl-4 ${
        !icon && !title ? "h-[44px]" : ""
      }`}
    >
      {icon && <div className="">{icon}</div>}
      {title && (
        <h3 className="text-[20px] sm:text-[24px] lg:text-[30px] font-bold text-center text-background">
          {title}
        </h3>
      )}
    </div>
  );
};

const Body: FC<CardContainerSectionProps> & { SubTitle: FC<CardBodySectionProps> } = ({ children }) => {
  return (
    <div className="flex flex-col items-center px-4 pb-4 border-4 border-custom-light-card-border rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] max-h-[254px] h-screen">
      {children}
    </div>
  );
};

const SubTitle: FC<CardBodySectionProps> = ({ children }) => {
  return (
    <h4 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-2">
      {children}
    </h4>
  );
};

// Attach SubTitle to Body
Body.SubTitle = SubTitle;

const Footer: FC<CardContainerSectionProps> = ({ children }) => {
  return <div className="mt-4">{children}</div>;
};

// Attach subcomponents to CardContainer
CardContainer.Header = Header;
CardContainer.Body = Body;
CardContainer.Footer = Footer;

export default CardContainer;
