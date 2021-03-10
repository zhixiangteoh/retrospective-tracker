import React from "react";
import { Button } from "shards-react";

import Box from "components/Box";
import Logo from "assets/icons/logo.svg";

const MainMenu = ({ menu, setMenu }) => {
  return (
    <Box
      width="300px"
      height="440px"
      padding={3}
      className="d-flex flex-column text-center"
    >
      <h5>Retrospective-Tracker</h5>
      <p>More time, deeper introspection.</p>
      <div className="mb-4">
        <Logo width="150px" height="150px" />
      </div>
      <Button outline className="m-2" onClick={() => setMenu("current")}>
        Current
      </Button>
      <Button
        outline
        theme="secondary"
        className="m-2"
        onClick={() => setMenu("previous")}
      >
        Previous
      </Button>
      <Button
        outline
        theme="danger"
        className="m-2"
        onClick={() => setMenu("actions")}
      >
        Action Items
      </Button>
    </Box>
  );
};

export default MainMenu;
