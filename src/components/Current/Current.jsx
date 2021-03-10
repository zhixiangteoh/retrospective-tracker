import React from "react";

import List from "components/List";
import ListContainer from "components/ListContainer";
import { ListProvider } from "context/List";

const Current = ({ setMenu }) => {
  return (
    <ListProvider>
      <ListContainer>
        <List setMenu={setMenu} />
      </ListContainer>
    </ListProvider>
  );
};

export default Current;
