import React from "react";

interface Props {
  heading: string;
}

const PageHeading: React.FC<Props> = ({ heading }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return <span className="text-xl font-bold">{heading}</span>;
};

export default PageHeading;
