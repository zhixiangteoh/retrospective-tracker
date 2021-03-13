import "libs/polyfills";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import browser from "webextension-polyfill";
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

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// to change
const firstMonday = getMondayDate(new Date("2/1/2021"));

const Popup = () => {
  const currentMondayKey = "currentMonday";
  const thisMonday = getMondayDate(new Date());

  const [page, setPage] = useState("current");
  const [isRefresh, setIsRefresh] = useState(false);
  const [currentMonday, setCurrentMonday] = useState(thisMonday);
  const currentMonInitRef = useRef(false);

  // initialize currentMonday value
  useEffect(async () => {
    const storage = await browser.storage.sync.get({
      [currentMondayKey]: thisMonday.toJSON(),
    });
    console.log("retrieved: ", new Date(storage[currentMondayKey]));
    setCurrentMonday(new Date(storage[currentMondayKey]));
    currentMonInitRef.current = true;
  }, []);

  // update browser storage value of currentMonday on change
  useEffect(() => {
    if (currentMonInitRef.current) {
      browser.storage.sync.set({
        [currentMondayKey]: currentMonday.toJSON(),
      });
    }
  }, [currentMonday]);

  const renderPage = () => {
    switch (page) {
      case "current":
        return (
          <Current
            currentMonday={currentMonday}
            setCurrentMonday={setCurrentMonday}
            refreshActions={() => {}}
          />
        );
      case "previous":
        return (
          <PreviousList
            currentMonday={currentMonday}
            // to change
            firstMonday={firstMonday}
            refreshActions={setIsRefresh}
          />
        );
      case "actions":
        return (
          <Actions
            currentMonday={currentMonday}
            // to change
            firstMonday={firstMonday}
            isRefresh={isRefresh}
            setIsRefresh={setIsRefresh}
          />
        );
      default:
        return null;
    }
  };

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
