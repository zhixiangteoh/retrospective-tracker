import React, { useState } from "react";
import { withTheme } from "styled-components";
import ListContainer from "../ListContainer/ListContainer";
import {
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "shards-react";
import { MoreVertical, Trash } from "react-feather";

const Actions = () => {
  const [tab, setTab] = useState("Y");
  const [yellowItems, setYellowItems] = useState([
    { id: "1", body: "asdfasdfasd" },
    { id: "2", body: "asdfasdfasd" },
  ]);
  const [redItems, setRedItems] = useState([
    { id: "1", body: "a;lkajds" },
    { id: "2", body: ";klasdf" },
  ]);
  return (
    <ListContainer header="Resolve these issues">
      <NavBar tab={tab} setTab={setTab} />
      <Issues
        items={tab === "Y" ? yellowItems : redItems}
        setItems={tab === "Y" ? setYellowItems : setRedItems}
      />
    </ListContainer>
  );
};

const Issues = withTheme(({ items, theme }) => {
  const [hoverIdx, setHoverIdx] = useState(null);
  const [dropdownIdx, setDropdownIdx] = useState(null);
  return (
    <>
      {items.map((item, idx) => (
        <div
          style={{
            padding: 8 * 2,
            margin: "0 0 8px 0",
            boxShadow:
              dropdownIdx === idx || hoverIdx === idx
                ? "0px 0px 10px rgba(0, 0, 0, 0.1)"
                : "0px 0px 2px rgba(0, 0, 0, 0.2)",
            transition: "box-shadow 0.3s ease-in-out",
            position: "relative",
            background: "white",
            whiteSpace: "pre-wrap",
          }}
          onMouseEnter={() => dropdownIdx === null && setHoverIdx(idx)}
          onMouseLeave={() => dropdownIdx === null && setHoverIdx(null)}
        >
          {item.body}
          {hoverIdx === idx && (
            <div style={{ position: "absolute", top: 13, right: 8 }}>
              <Dropdown
                open={dropdownIdx === idx}
                toggle={() => setDropdownIdx(dropdownIdx === idx ? null : idx)}
                className="d-table"
              >
                <DropdownToggle
                  outline
                  pill
                  theme="light"
                  style={{
                    padding: 4,
                    border: 0,
                  }}
                >
                  <MoreVertical size={20} />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Move to{" "}
                    <span style={{ color: theme.palette.green }}>Green</span>
                  </DropdownItem>
                  <DropdownItem>
                    Move to{" "}
                    <span style={{ color: theme.palette.yellow }}>Yellow</span>
                  </DropdownItem>
                  <DropdownItem>
                    Move to{" "}
                    <span style={{ color: theme.palette.red }}>Red</span>
                  </DropdownItem>
                  <DropdownItem
                    style={{
                      color: theme.palette.red,
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Trash size={14} style={{ marginRight: 4 }} /> Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        </div>
      ))}
    </>
  );
});

const NavBar = withTheme(({ tab, setTab, theme }) => (
  <Nav tabs fill style={{ marginBottom: 16 }}>
    <NavItem>
      <NavLink
        style={{ cursor: "pointer", fontSize: 14, color: theme.palette.yellow }}
        active={tab === "Y"}
        onClick={() => setTab("Y")}
      >
        Yellow
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        style={{ cursor: "pointer", fontSize: 14, color: theme.palette.red }}
        active={tab === "R"}
        onClick={() => setTab("R")}
      >
        Red
      </NavLink>
    </NavItem>
  </Nav>
));

export default Actions;
