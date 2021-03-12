import "libs/polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, StyleSheetManager } from "styled-components";
import Box from "components/Box";
import Example from "components/Example";
import defaultTheme from "themes/default";

const root = document.createElement("div");
const shadow = root.attachShadow({ mode: "open" });

const styleContainer = document.createElement("div");
const appContainer = document.createElement("div");

shadow.appendChild(styleContainer);
shadow.appendChild(appContainer);

document.body.appendChild(root);

const App = () => {
  return <></>;
};

ReactDOM.render(<App />, appContainer);
