import React from "react";

interface Props {
  heading: string;
}

const PageHeading: React.FC<Props> = ({ heading }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <div className="py-5">
      <span className="text-xl font-bold">{heading}</span>
    </div>
  );
};

export default PageHeading;
