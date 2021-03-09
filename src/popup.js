import "libs/polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import defaultTheme from "themes/default";

import Box from "components/Box";
import Example from "components/Example";
import List from "components/List";
import ListContainer from "components/ListContainer";
import { ListProvider } from "context/List";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

const Popup = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Box width="200px" padding={3}>
        <Example />
      </Box> */}
      <ListProvider>
        <ListContainer>
          <List />
        </ListContainer>
      </ListProvider>
    </ThemeProvider>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
document.body.style.margin = 0;

ReactDOM.render(<Popup />, root);
