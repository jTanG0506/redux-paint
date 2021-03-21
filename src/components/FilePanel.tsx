import React from "react";
import { useDispatch } from "react-redux";
import { saveAs } from "file-saver";
import { useCanvas } from "../context/CanvasContext";
import { show } from "../modules/modals/slice";
import { getCanvasImage } from "../utils/canvas";

export const FilePanel = () => {
  const dispatch = useDispatch();

  const canvasRef = useCanvas();

  const exportToFile = async () => {
    const file = await getCanvasImage(canvasRef.current);
    if (!file) {
      return;
    }
    saveAs(file, "drawing.png");
  };

  return (
    <div className="window file">
      <div className="title-bar">
        <div className="title-bar-text">File</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button className="save-button" onClick={exportToFile}>
            Export
          </button>
          <button
            className="save-button"
            onClick={() => {
              dispatch(show("PROJECTS_SAVE_MODAL"));
            }}
          >
            Save
          </button>
          <button
            className="save-button"
            onClick={() => {
              dispatch(show("PROJECTS_MODAL"));
            }}
          >
            Load
          </button>
        </div>
      </div>
    </div>
  );
};
