import React, { useReducer, useEffect, useState, useRef } from "react";
import browser from "webextension-polyfill";

import { ListProvider, INIT, reducer } from "context/List";
import getMondayDate from "util/getMondayDate";
import getDayDiff from "util/getDayDiff";

// global list object
const ActionsContext = React.createContext({});

const ActionsProvider = ({
  storageKey,
  currentMonday,
  firstMonday,
  isRefresh,
  setIsRefresh,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {});
  const [actions, setActions] = useState({});
  const initRef = useRef(false);

  // sync with browser storage
  useEffect(() => {
    if (initRef.current) {
      browser.storage.sync.set({ [storageKey]: state });
    }
  }, [state]);

  // listen to storage change and update context
  useEffect(() => {
    browser.storage.onChanged.addListener((changes) => {
      if (changes[storageKey]) {
        dispatch({ type: INIT, payload: changes[storageKey].newValue });
      }
    });
  }, []);

  const getPreviousKeys = () => {
    let daySpan = getDayDiff(currentMonday, firstMonday);
    let daysArr = [];
    let week = 1;

    while (daySpan > 0) {
      const daysToSubtract = week * 7;
      daysArr.push(daysToSubtract);

      week++;
      daySpan -= 7;
    }

    return daysArr.map((days) =>
      getMondayDate(
        new Date(new Date().setDate(currentMonday.getDate() - days))
      )
    );
  };

  const aggregatePreviousItems = (
    { greenItems, yellowItems, redItems },
    actionsList
  ) => {
    let newActionsList = {};
    newActionsList.greenItems = actionsList.greenItems.concat(greenItems);
    newActionsList.yellowItems = actionsList.yellowItems.concat(yellowItems);
    newActionsList.redItems = actionsList.redItems.concat(redItems);

    return newActionsList;
  };

  const initActions = async () => {
    const previousKeys = getPreviousKeys();

    let actionsList = { greenItems: [], yellowItems: [], redItems: [] };

    let i = 0;
    while (i < previousKeys.length) {
      const key = previousKeys[i];
      const storage = await browser.storage.sync.get({ [key]: 0 });
      const list = storage[key];
      actionsList = aggregatePreviousItems(list, actionsList);

      i++;
    }

    setActions(actionsList);
  };

  useEffect(async () => {
    await initActions();
  }, [currentMonday]);

  // initialize with yellow and red items from all previous lists
  useEffect(async () => {
    const storage = await browser.storage.sync.set({
      [storageKey]: actions,
    });
    dispatch({ type: INIT, payload: storage[storageKey] });

    initRef.current = true;
    setIsRefresh(false);
  }, [actions, isRefresh, storageKey]);

  return (
    <ActionsContext.Provider value={[state, dispatch]}>
      {children}
    </ActionsContext.Provider>
  );
};

export { ActionsContext, ActionsProvider };
