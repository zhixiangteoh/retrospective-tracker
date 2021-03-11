import React, { useState } from "react";
import { Button } from "shards-react";

import List from "components/List";
import ListContainer from "components/ListContainer";
import { ListProvider } from "context/List";
import getMondayDate from "util/getMondayDate";
import getddmm from "../../util/getddmm";

const Save = (props) => {
  return (
    <Button outline pill size="sm" {...props}>
      Start New Week
    </Button>
  );
};

const Current = ({ setMenu, currentMonday, setCurrentMonday }) => {
  const [key, setKey] = useState(currentMonday);

  const handleSave = () => {
    const nextMonday = getMondayDate(
      new Date(key.getTime() + 7 * 24 * 60 * 60 * 1000)
    ); // Monday of next week
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
          <Save onClick={handleSave} />
        </div>
        <List />
      </ListContainer>
    </ListProvider>
  );
};

export default Current;
