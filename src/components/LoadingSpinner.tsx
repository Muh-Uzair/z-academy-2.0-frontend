import React from "react";
import { Loader } from "lucide-react";

interface Props {
  size?: number | string;
  color?: string;
}

const LoadingSpinner: React.FC<Props> = ({ size = 14, color = "white" }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <Loader
      className={`animate-spin text-[${size}px] text-${
        color === "white" ? "white" : "primary"
      }`}
    />
  );
};

export default LoadingSpinner;
