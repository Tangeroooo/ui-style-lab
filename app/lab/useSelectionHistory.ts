import { useCallback, useState } from "react";

import { axisKeys, type Selection } from "../style-data";

const historyLimit = 10;

type SelectionHistory = {
  past: Selection[];
  present: Selection;
  future: Selection[];
};

function selectionsMatch(left: Selection, right: Selection) {
  return axisKeys.every((axis) => left[axis] === right[axis]);
}

export function useSelectionHistory(initialSelection: Selection) {
  const [history, setHistory] = useState<SelectionHistory>({
    past: [],
    present: initialSelection,
    future: [],
  });

  const commit = useCallback((next: Selection) => {
    setHistory((current) => {
      if (selectionsMatch(current.present, next)) return current;
      return {
        past: [...current.past, current.present].slice(-historyLimit),
        present: next,
        future: [],
      };
    });
  }, []);

  const replace = useCallback((next: Selection) => {
    setHistory((current) => selectionsMatch(current.present, next)
      ? current
      : { ...current, present: next });
  }, []);

  const undo = useCallback(() => {
    const restored = history.past.at(-1) ?? null;
    if (!restored) return null;
    setHistory({
      past: history.past.slice(0, -1),
      present: restored,
      future: [history.present, ...history.future].slice(0, historyLimit),
    });
    return restored;
  }, [history]);

  const redo = useCallback(() => {
    const restored = history.future[0] ?? null;
    if (!restored) return null;
    setHistory({
      past: [...history.past, history.present].slice(-historyLimit),
      present: restored,
      future: history.future.slice(1),
    });
    return restored;
  }, [history]);

  return {
    selection: history.present,
    commit,
    replace,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}
