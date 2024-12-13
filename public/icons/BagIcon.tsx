import React, { SVGProps } from "react";

export const BagIcon: React.FC<SVGProps<SVGSVGElement>> = ({
  width = 33,
  height = 30,
  color = "#9354FF",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 33 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.25 2.5L4.125 7.5V25C4.125 25.663 4.41473 26.2989 4.93046 26.7678C5.44618 27.2366 6.14565 27.5 6.875 27.5H26.125C26.8543 27.5 27.5538 27.2366 28.0695 26.7678C28.5853 26.2989 28.875 25.663 28.875 25V7.5L24.75 2.5H8.25Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.125 7.5H28.875"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 12.5C22 13.8261 21.4205 15.0979 20.3891 16.0355C19.3576 16.9732 17.9587 17.5 16.5 17.5C15.0413 17.5 13.6424 16.9732 12.6109 16.0355C11.5795 15.0979 11 13.8261 11 12.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
