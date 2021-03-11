import React, { useState, useEffect } from "react";
import { Button, Collapse } from "shards-react";
import { ChevronDown, ChevronUp } from "react-feather";

import Previous from "components/Previous";
import ListContainer from "components/ListContainer";
import ListHeader from "components/ListHeader";
import getDayDiff from "util/getDayDiff";

const PreviousList = ({ setMenu, currentMonday, firstMonday }) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    console.log(getDates());
    setDates(getDates());
  }, []);

  const [activeInd, setActiveInd] = useState(null);

  // for test
  const getDates = () => {
    let daySpan = getDayDiff(currentMonday, firstMonday);
    let daysArr = [];
    let week = 1;

    while (daySpan > 0) {
      const daysToSubtract = week * 7;
      daysArr.push(daysToSubtract);

      week++;
      daySpan -= 7;
    }

    return daysArr.map(
      (days) => new Date(new Date().setDate(currentMonday.getDate() - days))
    );
  };

  const renderList = () => {
    return dates.map((date, idx) => {
      return (
        <PreviousElt
          header={idx === 0 ? "Previous week" : `Week ${dates.length - idx}`}
          date={date}
          setMenu={setMenu}
          active={activeInd === idx}
          setActive={(active) => setActiveInd(active ? null : idx)}
        />
      );
    });
  };

  return (
    <ListContainer setMenu={setMenu} header="Review past retrospectives">
      {renderList()}
    </ListContainer>
  );
};

const PreviousElt = ({ header, date, setMenu, active, setActive }) => {
  return (
    <div style={{ marginBottom: 4 }}>
      <ListHeader
        header={header}
        mondayDate={date}
        isCollapsible={true}
        active={active}
        onClick={(el) => {
          if (active) el.nativeEvent.srcElement.blur();
          setActive(active);
        }}
      />
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Collapse open={active}>
          <Previous key={date} setMenu={setMenu} date={date} />
        </Collapse>
      </div>
    </div>
  );
};

const Action = ({ collapsed }) => {
  return (
    <Button outline style={{ border: 0, padding: 0 }}>
      {collapsed ? <ChevronDown size={25} /> : <ChevronUp size={25} />}
    </Button>
  );
};

export default PreviousList;
