import React, { useState } from "react";
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormTextarea,
  Button,
  Fade,
} from "shards-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Box from "components/Box";

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

const List = () => {
  const [value, setValue] = useState("");
  const [greenItems, setGreenItems] = useState([
    { id: "0", body: "0" },
    { id: "1", body: "1" },
  ]);
  const [yellowItems, setYellowItems] = useState([
    { id: "2", body: "2" },
    { id: "3", body: "3" },
  ]);
  const [redItems, setRedItems] = useState([
    { id: "4", body: "4" },
    { id: "5", body: "5" },
  ]);

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    return [sourceClone, destClone];
  };

  const getList = (id) => {
    if (id === "G") return greenItems;
    if (id === "Y") return yellowItems;
    else return redItems;
  };

  const setList = (id, items) => {
    if (id === "G") setGreenItems(items);
    else if (id === "Y") setYellowItems(items);
    else setRedItems(items);
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
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setList(source.droppableId, result[0]);
      setList(destination.droppableId, result[1]);
    }
  };

  const handleInputChange = ({ target: { value } }) => setValue(value);

  const onKeyPress = (event) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };

  const addGreenItem = () => {
    if (!value.trim()) return;
    setGreenItems([
      {
        id: `${greenItems.length + yellowItems.length + redItems.length + 1}`,
        body: value.trim(),
      },
      ...greenItems,
    ]);
    setValue("");
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <InputGroup>
        <FormTextarea
          placeholder="Add an item..."
          autoFocus
          onKeyPress={onKeyPress}
          type="text"
          value={value}
          onChange={handleInputChange}
        />
        <InputGroupAddon type="append">
          <Button theme="primary" onClick={addGreenItem}>
            Add
          </Button>
        </InputGroupAddon>
      </InputGroup>

      <DragDropContext onDragEnd={onDragEnd}>
        <div>GREEN</div>
        <DroppableList id="G" items={greenItems} />

        <div>YELLOW</div>
        <DroppableList id="Y" items={yellowItems} />

        <div>RED</div>
        <DroppableList id="R" items={redItems} />
      </DragDropContext>
    </Box>
  );
};

const DroppableList = ({ id, items }) => (
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

export default List;
