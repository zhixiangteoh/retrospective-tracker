import {
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM,
  ADD_GREEN_ITEM,
  ADD_YELLOW_ITEM,
  ADD_RED_ITEM,
  SET_GREEN_ITEMS,
  SET_YELLOW_ITEMS,
  SET_RED_ITEMS,
  INIT,
} from "./actions";
import objectMap from "util/objectMap";

const reducer = (state, { payload, type }) => {
  switch (type) {
    case ADD_ITEM:
      // always add to green list
      return {
        greenItems: [
          {
            id: Math.random()
              .toString(16)
              .substr(2),
            body: payload,
          },
          ...state.greenItems,
        ],
        yellowItems: state.yellowItems,
        redItems: state.redItems,
      };
    case REMOVE_ITEM:
      return objectMap(state, (colorItems) => {
        return colorItems.filter(({ id }) => id !== payload);
      });
    case UPDATE_ITEM:
      return objectMap(state, (colorItems) => {
        return colorItems.map((item) => {
          if (item.id === payload.id) {
            return { ...item, body: payload.body };
          }

          return item;
        });
      });
    case ADD_GREEN_ITEM:
      return {
        greenItems: [
          {
            id: Math.random()
              .toString(16)
              .substr(2),
            body: payload,
          },
          ...state.greenItems,
        ],
        yellowItems: state.yellowItems,
        redItems: state.redItems,
      };
    case ADD_YELLOW_ITEM:
      return {
        greenItems: state.greenItems,
        yellowItems: [
          {
            id: Math.random()
              .toString(16)
              .substr(2),
            body: payload,
          },
          ...state.yellowItems,
        ],
        redItems: state.redItems,
      };
    case ADD_RED_ITEM:
      return {
        greenItems: state.greenItems,
        yellowItems: state.yellowItems,
        redItems: [
          {
            id: Math.random()
              .toString(16)
              .substr(2),
            body: payload,
          },
          ...state.redItems,
        ],
      };
    case SET_GREEN_ITEMS:
      return {
        greenItems: payload,
        yellowItems: state.yellowItems,
        redItems: state.redItems,
      };
    case SET_YELLOW_ITEMS:
      return {
        greenItems: state.greenItems,
        yellowItems: payload,
        redItems: state.redItems,
      };
    case SET_RED_ITEMS:
      return {
        greenItems: state.greenItems,
        yellowItems: state.yellowItems,
        redItems: payload,
      };
    case INIT:
      return payload;
    default:
      throw new Error(`No such action: ${type}`);
  }
};

export default reducer;
