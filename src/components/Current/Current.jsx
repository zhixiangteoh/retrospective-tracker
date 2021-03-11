import React, { useState } from "react";
import { Button } from "shards-react";
import { Save } from "react-feather";

import List from "components/List";
import ListContainer from "components/ListContainer";
import ListHeader from "components/ListHeader";
import { ListProvider } from "context/List";
import getMondayDate from "util/getMondayDate";

const Action = () => {
  return (
    <Button outline style={{ border: 0, padding: 0 }}>
      <Save size={25} />
    </Button>
  );
};

const Current = ({ setMenu, currentMonday, setCurrentMonday }) => {
  const [key, setKey] = useState(currentMonday);

  const handleSave = () => {
    const nextMonday = getMondayDate(
      new Date(key.getTime() + 7 * 24 * 60 * 60 * 1000)
    ); // Monday of next week
    console.log(nextMonday);
    setKey(nextMonday);
    setCurrentMonday(nextMonday);
  };

  return (
    <ListProvider storageKey={key}>
      <ListContainer setMenu={setMenu} header="Reflect on the current week">
        <ListHeader
          header={"Current week"}
          mondayDate={key}
          isCollapsible={false}
          action={<Action />}
          onClick={handleSave}
        />
        <List />
      </ListContainer>
    </ListProvider>
  );
};

export default Current;
