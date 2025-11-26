import React from "react";

const index: React.FC<{ lastInfraction: Date }> = ({ lastInfraction }) => (
  <span>{lastInfraction.toLocaleDateString()}</span>
);

export default index;
