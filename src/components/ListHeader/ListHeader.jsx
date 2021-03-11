import React from "react";
import { Button } from "shards-react";
import { ChevronDown, ChevronUp } from "react-feather";

import getmmmddyyyy from "util/getmmmddyyyy";

const ListHeader = ({ header, mondayDate, collapsed, ...props }) => {
  return (
    <Button
      outline
      block
      theme="light"
      style={{
        border: 0,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: 16,
      }}
      className="d-flex flex-row justify-content-between align-items-center"
      {...props}
    >
      <div className="text-uppercase">{header}</div>
      {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      <div className="text-uppercase">{`Mon ${getmmmddyyyy(mondayDate)}`}</div>
    </Button>
  );
};

export default ListHeader;
