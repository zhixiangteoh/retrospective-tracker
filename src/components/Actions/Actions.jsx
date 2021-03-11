import React, { useState } from "react";
import ListContainer from "../ListContainer/ListContainer";
import {
  Button,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "shards-react";
import { MoreVertical, Trash } from "react-feather";

const Actions = ({ theme }) => {
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

const Issues = ({ items }) => {
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
                  <DropdownItem>Move to Green</DropdownItem>
                  <DropdownItem>Move to Yellow</DropdownItem>
                  <DropdownItem>Move to Red</DropdownItem>
                  <DropdownItem
                    style={{
                      color: "#ee5253",
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
};

const NavBar = ({ tab, setTab, theme }) => (
  <Nav tabs fill style={{ marginBottom: 16 }}>
    <NavItem>
      <NavLink
        style={{ cursor: "pointer", fontSize: 14, color: "#f7b731" }}
        active={tab === "Y"}
        onClick={() => setTab("Y")}
      >
        Yellow
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        style={{ cursor: "pointer", fontSize: 14, color: "#ee5253" }}
        active={tab === "R"}
        onClick={() => setTab("R")}
      >
        Red
      </NavLink>
    </NavItem>
  </Nav>
);

export default Actions;
