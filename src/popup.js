import "libs/polyfills";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import defaultTheme from "themes/default";

import Box from "components/Box";
import Example from "components/Example";
import Current from "components/Current";
import PreviousList from "components/PreviousList";
import { Nav, NavItem, NavLink } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./popup.css";

import getMondayDate from "util/getMondayDate";
import Actions from "./components/Actions";

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const thisMonday = getMondayDate(new Date());
// to change
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

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Box width="200px" padding={3}>
        <Example />
      </Box> */}
      <Nav pills fill justified style={{ padding: "8px", background: "white" }}>
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
      {renderPage()}
    </ThemeProvider>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
document.body.style.margin = 0;
document.body.style.background = "#fafafa";

ReactDOM.render(<Popup />, root);
