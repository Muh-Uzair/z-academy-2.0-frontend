import React from "react";
import ZAcademyLogo from "./ZAcademyLogo";

const DashboardHeader: React.FC = () => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <header className="tab:hidden fixed top-0 right-0 left-0 z-10 flex h-[50px] items-center justify-start border border-b bg-white p-3">
      <ZAcademyLogo />
    </header>
  );
};

export default DashboardHeader;
