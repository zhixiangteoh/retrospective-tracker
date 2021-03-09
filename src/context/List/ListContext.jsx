import React, { useReducer, useEffect, useRef } from "react";
import browser from "webextension-polyfill";

import getStubList from "./getStubList";
import { INIT } from "./actions";
import reducer from "./reducer";

// global list object
const ListContext = React.createContext({});

const ListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const initRef = useRef(false);

  // sync with browser storage
  useEffect(() => {
    if (initRef.current) {
      browser.storage.sync.set({ list: state });
    }
  }, [state]);

  // listen to storage change and update context
  useEffect(() => {
    browser.storage.onChanged.addListener((changes) => {
      if (changes.list) {
        dispatch({ type: INIT, payload: changes.list.newValue });
      }
    });
  }, []);

  // initialize with stub list
  useEffect(async () => {
    const { list } = await browser.storage.sync.get({ list: getStubList() });
    dispatch({ type: INIT, payload: list });
    initRef.current = true;
  }, []);

  return (
    <ListContext.Provider value={[state, dispatch]}>
      {children}
    </ListContext.Provider>
  );
};

export { ListContext, ListProvider };
