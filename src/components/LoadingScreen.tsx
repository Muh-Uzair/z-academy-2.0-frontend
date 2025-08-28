import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingScreen: React.FC = () => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSpinner color="primary" />
    </div>
  );
};

export default LoadingScreen;
