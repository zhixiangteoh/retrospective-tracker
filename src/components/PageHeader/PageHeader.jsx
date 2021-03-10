import React from "react";

const PageHeader = ({ setMenu, header }) => {
  return (
    <h5>
      <a onClick={() => setMenu("")} href="">
        &lt;
      </a>{" "}
      {header}
    </h5>
  );
};

export default PageHeader;
