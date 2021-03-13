import React, { useState } from "react";
import { Button } from "shards-react";

import List from "components/List";
import ListContainer from "components/ListContainer";
import { ListProvider } from "context/List";
import getMondayDate from "util/getMondayDate";
import getDayDiff from "util/getDayDiff";
import getddmm from "../../util/getddmm";

const getNextMonday = (date) => {
  const nextMonday = getMondayDate(
    new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000)
  ); // Monday of next week

  return nextMonday;
};

const getCurrentMonday = () => {
  return getMondayDate(new Date()); // Monday of this week
};

const Save = ({ disabled, ...props }) => {
  return (
    <Button
      outline
      pill
      disabled={disabled}
      theme={disabled ? "danger" : "primary"}
      size="sm"
      {...props}
    >
      Start New Week
    </Button>
  );
};

const Current = ({
  setMenu,
  currentMonday,
  setCurrentMonday,
  refreshActions,
}) => {
  const [key, setKey] = useState(currentMonday);

  const isSaveable = () => {
    return getDayDiff(getCurrentMonday(), getNextMonday(key)) <= 7;
  };

  const handleSave = () => {
    const nextMonday = getNextMonday(key);
    setKey(nextMonday);
    setCurrentMonday(nextMonday);
  };

  return (
    <ListProvider storageKey={key}>
      <ListContainer setMenu={setMenu} header="Reflect on the current week">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#333",
            }}
          >
            {`${getddmm(key)} - ${getddmm(key.addDays ? key.addDays(5) : key)}`}
          </div>
          <Save
            onClick={isSaveable() ? handleSave : () => {}}
            style={!isSaveable() ? { cursor: "not-allowed" } : null}
            disabled={!isSaveable()}
          />
        </div>
        <List refreshActions={refreshActions} />
      </ListContainer>
    </ListProvider>
  );
};

export default Current;
