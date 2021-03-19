import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { undo, redo } from "./actions";
import { historyIndexSelector, strokesSelector } from "./selectors";

export const EditPanel = () => {
  const dispatch = useDispatch();
  const strokes = useSelector(strokesSelector);
  const historyIndex = useSelector(historyIndexSelector);

  const handleUndo = useCallback(() => {
    dispatch(undo());
  }, [dispatch]);

  const handleRedo = useCallback(() => {
    dispatch(redo());
  }, [dispatch]);

  return (
    <div className="window edit">
      <div className="title-bar">
        <div className="title-bar-text">Edit</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button
            disabled={historyIndex === strokes.length}
            className="button redo"
            onClick={handleUndo}
          >
            Undo
          </button>
          <button
            disabled={historyIndex === 0}
            className="button undo"
            onClick={handleRedo}
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  );
};
