import React, { useState } from "react";
import { DatePicker } from 'react-rainbow-components';



const containerStyles = {
    maxWidth: 400,
};

const initialState = { startDate: undefined };

const setState = ({ startDate }) => {
    initialState.startDate = startDate;
    // do some logic for updating the global states
}


const StartDatePicker = () => {
  
  return (
    <div
        className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
        style={containerStyles}
    >
        <DatePicker
            required
            error="Select a date is Required"
            placeholder="Select a date"
            value={initialState.startDate}
            label="Pick the start day of the hackathon"
            onChange={value => setState({ startDate: value })}
        />
    </div>
  );
};

export default StartDatePicker;
