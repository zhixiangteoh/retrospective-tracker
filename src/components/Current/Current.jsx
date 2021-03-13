import React, { useState, useEffect, useContext } from "react";
import { Button } from "shards-react";

import List from "components/List";
import ListContainer from "components/ListContainer";
import { ListProvider, ListContext } from "context/List";
import getMondayDate from "util/getMondayDate";
import getDayDiff from "util/getDayDiff";
import getddmm from "util/getddmm";
import { Copy as CopyIcon, Plus } from "react-feather";

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
      theme="primary"
      size="sm"
      {...props}
    >
      <Plus
        size={16}
        style={{ marginTop: -2, marginLeft: -5, marginRight: 2 }}
      />
      Start New Week
    </Button>
  );
};

const Copy = ({ disabled, ...props }) => {
  const [list, dispatch] = useContext(ListContext);
  const onClick = () => {
    const textField = document.createElement("textarea");
    textField.textContent = `\
Green:
${
  list.greenItems.length === 0
    ? "\tNone"
    : list.greenItems
        .map((item) => `\t- ${item.body.split("\n").join("\n\t")}`)
        .join("\n")
}

Yellow:
${
  list.yellowItems.length === 0
    ? "\tNone"
    : list.yellowItems
        .map((item) => `\t- ${item.body.split("\n").join("\n\t")}`)
        .join("\n")
}

Red:
${
  list.redItems.length === 0
    ? "\tNone\n"
    : list.redItems
        .map((item) => `\t- ${item.body.split("\n").join("\n\t")}`)
        .join("\n")
}`;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  return (
    <Button
      outline
      pill
      disabled={disabled}
      theme={disabled ? "danger" : "primary"}
      size="sm"
      onClick={onClick}
      {...props}
    >
      <CopyIcon size={12} /> Copy
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

  useEffect(() => {
    setKey(currentMonday);
  }, [currentMonday]);

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
          <div>
            <Copy style={{ marginRight: 8 }} />
            <Save
              onClick={isSaveable() ? handleSave : () => {}}
              style={!isSaveable() ? { cursor: "not-allowed" } : null}
              disabled={!isSaveable()}
            />
          </div>
        </div>
        <List refreshActions={refreshActions} />
      </ListContainer>
    </ListProvider>
  );
};

export default Current;
