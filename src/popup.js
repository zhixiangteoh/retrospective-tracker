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

const Popup = () => {
  const [page, setPage] = useState("current");

  const renderPage = () => {
    switch (page) {
      case "current":
        return <Current />;
      case "previous":
        return <PreviousList />;
      case "actions":
        return <Current />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Box width="200px" padding={3}>
        <Example />
      </Box> */}
      <Nav pills fill justified style={{ margin: "8px" }}>
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

ReactDOM.render(<Popup />, root);
