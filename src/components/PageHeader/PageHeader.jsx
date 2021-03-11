import React from "react";

const PageHeader = ({ header, action }) => {
  const Action = action ? action : null;

  return (
    <div className="d-flex flex-row justify-content-between">
      <h5>{header}</h5>
      {action ? <Action size={20} /> : null}
    </div>
  );
};

export default PageHeader;
