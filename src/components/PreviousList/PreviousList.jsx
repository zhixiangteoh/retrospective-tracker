import React, { useState } from "react";

import Previous from "components/Previous";
import ListContainer from "components/ListContainer";
import ListHeader from "components/ListHeader";
import { Collapse } from "shards-react";

// for test
const getDates = () => {
  let daysArr = [];
  for (let week = 1; week < 5; week++) {
    // 0: current, 1: previous week, 2: 2 weeks ago, 3: 3 weeks ago, 4: 4 weeks ago
    const daysToSubtract = week * 7;
    daysArr.push(daysToSubtract);
  }

  return daysArr.map(
    (days) => new Date(new Date().setDate(new Date().getDate() - days))
  );
};

const PreviousList = ({ setMenu }) => {
  const renderList = () => {
    const dates = getDates();

    return dates.map((date, idx) => {
      return (
        <PreviousElt
          collapsedDefault={idx === 0 ? false : true}
          header={idx === 0 ? "Previous week" : `Week ${dates.length - idx}`}
          date={date}
          setMenu={setMenu}
        />
      );
    });
  };

  return (
    <ListContainer
      setMenu={setMenu}
      header="Review previous weeks' retrospectives"
    >
      {renderList()}
    </ListContainer>
  );
};

const PreviousElt = ({ header, date, setMenu, collapsedDefault }) => {
  const [collapsed, setCollapsed] = useState(collapsedDefault);

  return (
    <>
      <ListHeader
        header={header}
        mondayDate={date}
        collapsed={collapsed}
        onClick={() => setCollapsed(!collapsed)}
      />
      {collapsed ? null : <Previous key={date} setMenu={setMenu} date={date} />}
    </>
  );
};

export default PreviousList;
