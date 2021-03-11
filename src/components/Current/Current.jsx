import React from "react";

import List from "components/List";
import ListContainer from "components/ListContainer";
import { ListProvider } from "context/List";
import getMondayDate from "util/getMondayDate";

const Current = ({ setMenu }) => {
  const key = getMondayDate(new Date());

  return (
    <ListProvider storageKey={key}>
      <ListContainer setMenu={setMenu} header="Reflect on the current week">
        <List />
      </ListContainer>
    </ListProvider>
  );
};

export default Current;
