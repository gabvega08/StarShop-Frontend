import React from "react";

interface IProps {
  color?: string;
  size?: number | string;
}

const Rolling = ({ size = 50, color = "#6b46c1" }: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      style={{ shapeRendering: "auto", display: "block", background: "none" }}
      width={size}
      height={size}
    >
      <g>
        <circle
          stroke-dasharray="164.93361431346415 56.97787143782138"
          r="35"
          stroke-width="10"
          stroke={color}
          fill={"none"}
          cy="50"
          cx="50"
        >
          <animateTransform
            keyTimes="0;1"
            values="0 50 50;360 50 50"
            dur="1s"
            repeatCount="indefinite"
            type="rotate"
            attributeName="transform"
          ></animateTransform>
        </circle>
        <g></g>
      </g>
    </svg>
  );
};

export default Rolling;
