import React, { useRef } from "react";
import { ChevronDown } from "react-feather";

import getmmmddyyyy from "util/getmmmddyyyy";

const ListHeader = ({ header, mondayDate, ...props }) => {
  return (
    <div
      className="mt-4 py-2 rounded d-flex flex-row justify-content-between align-items-center"
      {...props}
    >
      <div className="text-uppercase">{header}</div>
      <ChevronDown size={16} />
      <div className="text-uppercase">{`Mon ${getmmmddyyyy(mondayDate)}`}</div>
    </div>
  );
};

export default ListHeader;
