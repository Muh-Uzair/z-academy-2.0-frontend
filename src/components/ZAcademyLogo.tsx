import { GraduationCap } from "lucide-react";
import Link from "next/link";
import React from "react";

const ZAcademyLogo: React.FC = () => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <Link href={"/"}>
      <span className="text-primary-extra-dark flex gap-2 font-extrabold">
        <GraduationCap />
        zAcademy
      </span>
    </Link>
  );
};

export default ZAcademyLogo;
