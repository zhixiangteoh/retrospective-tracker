import React from "react";

import List from "components/List";
import { ListProvider } from "context/List";
import getMondayDate from "util/getMondayDate";

const Previous = ({ date }) => {
  const key = getMondayDate(date);

  return (
    <ListProvider storageKey={key}>
      <div className="mb-4">
        <List />
      </div>
    </ListProvider>
  );
};

export default Previous;
