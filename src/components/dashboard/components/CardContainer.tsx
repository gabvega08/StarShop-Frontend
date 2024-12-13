"use client";

import React, { FC, ReactNode } from "react";

interface CardContainerProps {
  children: ReactNode;
}

const CardContainer: FC<CardContainerProps> = ({
  children,
}) => {
  return (
    <div className={`flex flex-col justify-end`}>
      {children}
    </div>
  );
};

export default CardContainer;
