import React, { useState, useContext } from "react";
import { withTheme } from "styled-components";
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormTextarea,
  FormInput,
  Button,
  Fade,
} from "shards-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Box from "components/Box";
import {
  ListContext,
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM,
  SET_GREEN_ITEMS,
  SET_YELLOW_ITEMS,
  SET_RED_ITEMS,
} from "context/List";

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 8 * 2,
  margin: "0 0 8px 0",
  boxShadow: "0px 4px 14px rgba(104, 104, 104, 0.1)",
  //   height: 40,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver, items) => ({
  background: isDraggingOver ? "lightblue" : "transparent",
  //   display: "flex",
  //   flexDirection: "column",
  //   height: items * 40 || 40,
  //   paddingBottom: isDraggingOver ? 40 : 0,
  //   marginBottom: 40,
  //   transition: "all 0.3s",
  padding: 8,
  //   width: 250,
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list).slice();
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const List = ({ theme, setMenu }) => {
  const [value, setValue] = useState("");
  const [list, dispatch] = useContext(ListContext);

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    return [sourceClone, destClone];
  };

  const getList = (id) => {
    if (id === "G") {
      return list.greenItems;
    }
    if (id === "Y") {
      return list.yellowItems;
    } else {
      return list.redItems;
    }
  };

  const setList = (id, items) => {
    if (id === "G") {
      dispatch({ type: SET_GREEN_ITEMS, payload: items });
    } else if (id === "Y") {
      dispatch({ type: SET_YELLOW_ITEMS, payload: items });
    } else {
      dispatch({ type: SET_RED_ITEMS, payload: items });
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const reorderedItems = reorder(
        getList(source.droppableId),
        result.source.index,
        result.destination.index
      );
      setList(source.droppableId, reorderedItems);
    } else {
      const moveResult = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setList(source.droppableId, moveResult[0]);
      setList(destination.droppableId, moveResult[1]);
    }
  };

  const handleInputChange = ({ target: { value } }) => {
    setValue(value);
  };

  const onKeyPress = (event) => {
    if (event.key.toLowerCase() === "enter") {
      addItem(event.target.value);
      setValue("");
    }
  };

  const addItem = (item = value) => {
    if (!item.trim()) return;
    dispatch({ type: ADD_ITEM, payload: item.trim() });
    setValue("");
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <h5>
        <a onClick={() => setMenu("")} href="">
          &lt;
        </a>{" "}
        Reflect on the current week
      </h5>
      <InputGroup className="mb-2">
        <FormInput
          placeholder="Add an item..."
          autoFocus
          onKeyPress={onKeyPress}
          type="text"
          value={value}
          onChange={handleInputChange}
        />
        <InputGroupAddon type="append">
          <Button theme="primary" onClick={addItem}>
            Add
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ color: theme.palette.green }} className="text-center">
          GREEN
        </div>
        {list.greenItems ? (
          <DroppableList id="G" items={list.greenItems} />
        ) : (
          <p>Loading...</p>
        )}
        <div style={{ color: theme.palette.yellow }} className="text-center">
          YELLOW
        </div>
        {list.greenItems ? (
          <DroppableList id="Y" items={list.yellowItems} />
        ) : (
          <p>Loading...</p>
        )}
        <div style={{ color: theme.palette.red }} className="text-center">
          RED
        </div>
        {list.greenItems ? (
          <DroppableList id="R" items={list.redItems} />
        ) : (
          <p>Loading...</p>
        )}
      </DragDropContext>
    </Box>
  );
};

const DroppableList = ({ id, items }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver, items.length)}
        >
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  <div>{item.body}</div>
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default withTheme(List);
