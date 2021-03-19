import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { undo, redo } from "./modules/historyIndex/actions";
import { historyIndexSelector } from "./modules/historyIndex/selectors";
import { strokesSelector } from "./modules/strokes/selectors";
import { RootState } from "./types";

export const EditPanel = () => {
  const dispatch = useDispatch();
  const historyIndex = useSelector<RootState, RootState["historyIndex"]>(historyIndexSelector)
  const strokes = useSelector<RootState, RootState["strokes"]>(strokesSelector)

  const handleUndo = useCallback(() => {
    dispatch(undo(strokes.length));
  }, [dispatch, strokes]);

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
