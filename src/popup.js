import "libs/polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import defaultTheme from "themes/default";

import Box from "components/Box";
import Example from "components/Example";
import List from "components/List";
import ListContainer from "components/ListContainer";

const Popup = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Box width="200px" padding={3}>
        <Example />
      </Box> */}
      <ListContainer>
        <List />
      </ListContainer>
    </ThemeProvider>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(<Popup />, root);
