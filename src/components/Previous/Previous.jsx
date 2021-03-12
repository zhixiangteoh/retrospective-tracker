import React from "react";

import List from "components/List";
import { ListProvider } from "context/List";
import getMondayDate from "util/getMondayDate";

const Previous = ({ date, refreshActions }) => {
  const key = getMondayDate(date);

  return (
    <ListProvider storageKey={key}>
      <div className="mb-4">
        <List refreshActions={refreshActions} />
      </div>
    </ListProvider>
  );
};

export default Previous;
