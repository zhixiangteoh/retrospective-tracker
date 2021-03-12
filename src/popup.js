import "libs/polyfills";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import defaultTheme from "themes/default";

import Current from "components/Current";
import PreviousList from "components/PreviousList";
import Actions from "components/Actions";
import { Nav, NavItem, NavLink } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./popup.css";

import getMondayDate from "util/getMondayDate";

import { DatePicker } from "react-rainbow-components";

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const containerStyles = {
  maxWidth: 400,
};

const thisMonday = getMondayDate(new Date());

const firstMonday = getMondayDate(new Date("2/1/2021"));

const Popup = () => {
  const [page, setPage] = useState("current");
  const [currentMonday, setCurrentMonday] = useState(thisMonday);

  const renderPage = () => {
    switch (page) {
      case "current":
        return (
          <Current
            currentMonday={currentMonday}
            setCurrentMonday={setCurrentMonday}
          />
        );
      case "previous":
        return (
          <PreviousList
            currentMonday={currentMonday}
            // to change
            firstMonday={firstMonday}
          />
        );
      case "actions":
        return <Actions />;
      default:
        return null;
    }
  };

  const [initialDate, setInitialDate] = useState(null);

  useEffect(async () => {
    let retroDate = await browser.storage.sync.get("retroDate");
    setInitialDate(retroDate);
  }, [initialDate]);

  const updateDateStorage = ({ startDate }) => {
    // write it to a file
    browser.storage.sync.set({
      retroDate: startDate,
    });

    setInitialDate(startDate);
  };

  if (!initialDate) {
    return (
      <div
        className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
        style={containerStyles}
      >
        <DatePicker
          required
          error="Select a date is Required"
          placeholder="Select a date"
          value={initialDate}
          label="Pick the start day of the hackathon"
          onChange={(value) => updateDateStorage({ startDate: value })}
        />
      </div>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Nav
        pills
        fill
        justified
        style={{
          padding: "8px",
          background: "white",
          position: "fixed",
          width: "100%",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            active={page === "current"}
            onClick={() => setPage("current")}
          >
            Current
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            active={page === "previous"}
            onClick={() => setPage("previous")}
          >
            Previous
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            active={page === "actions"}
            onClick={() => setPage("actions")}
          >
            Action Items
          </NavLink>
        </NavItem>
      </Nav>
      <div style={{ height: 60 }} />
      <div style={{ height: 540, overflow: "scroll" }}>
        {renderPage()}

        <div
          className="text-center highlight-text"
          style={{
            color: "#CCC",
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 40,
            cursor: "pointer",
            transition: "0.3s",
          }}
          onClick={() => {}}
        >
          Reset all settings
        </div>
      </div>
    </ThemeProvider>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
document.body.style.margin = 0;
document.body.style.background = "#fafafa";

ReactDOM.render(<Popup />, root);
