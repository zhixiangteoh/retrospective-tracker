import "libs/polyfills";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import defaultTheme from "themes/default";

import Box from "components/Box";
import Example from "components/Example";
import MainMenu from "components/MainMenu";
import Current from "components/Current";
import PreviousList from "components/PreviousList";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

const Popup = () => {
  const [page, setPage] = useState("");

  const renderPage = () => {
    switch (page) {
      case "current":
        return <Current setMenu={setPage} />;
      case "previous":
        return <PreviousList setMenu={setPage} />;
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
      {page ? (
        renderPage()
      ) : (
        <MainMenu menu={page} setMenu={(page) => setPage(page)} />
      )}
    </ThemeProvider>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
document.body.style.margin = 0;

ReactDOM.render(<Popup />, root);
