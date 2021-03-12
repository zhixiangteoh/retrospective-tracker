import React, { useState } from "react";
import { Button } from "shards-react";
import { DatePicker } from 'react-rainbow-components';


import List from "components/List";
import ListContainer from "components/ListContainer";
import { ListProvider } from "context/List";
import getMondayDate from "util/getMondayDate";
import getddmm from "../../util/getddmm";

const containerStyles = {
    maxWidth: 400,
};

const initialState = { startDate: undefined };


const StartDatePicker = () => {
  const [key, setKey] = useState(currentMonday);

  const handleSave = () => {
    const nextMonday = getMondayDate(
      new Date(key.getTime() + 7 * 24 * 60 * 60 * 1000)
    ); // Monday of next week
    setKey(nextMonday);
    setCurrentMonday(nextMonday);
  };

  return (
    <div
        className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
        style={containerStyles}
    >
        <DatePicker
            required
            error="Select a date is Required"
            placeholder="Select a date"
            value={state.date}
            label="Pick the start day of the hackathon"
            onChange={value => setState({ startDate: value })}
        />
    </div>
  );
};

export default StartDatePicker;
