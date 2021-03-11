import React from "react";
import { Button } from "shards-react";
import { Save } from "react-feather";

import List from "components/List";
import ListContainer from "components/ListContainer";
import { ListProvider } from "context/List";
import getMondayDate from "util/getMondayDate";

const Action = () => {
  const handleSave = () => {
    return;
  };

  return (
    <Button onClick={handleSave}>
      <Save size={20} />{" "}
    </Button>
  );
};

const Current = ({ setMenu }) => {
  const key = getMondayDate(new Date());

  return (
    <ListProvider storageKey={key}>
      <ListContainer
        setMenu={setMenu}
        header="Reflect on the current week"
        action={Action}
      >
        <List />
      </ListContainer>
    </ListProvider>
  );
};

export default Current;
