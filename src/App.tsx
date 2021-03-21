import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCanvas, drawStroke, setCanvasSize } from "./canvasUtils";
import { ModalLayer } from "./ModalLayer";
import { FilePanel } from "./FilePanel";
import { useCanvas } from "./CanvasContext";
import { ColorPanel } from "./ColorPanel";
import { EditPanel } from "./EditPanel";
import { beginStroke, updateStroke } from "./modules/currentStroke/slice";
import { endStroke } from "./modules/sharedActions";
import { currentStrokeSelector } from "./modules/currentStroke/selectors";
import { historyIndexSelector } from "./modules/historyIndex/selectors";
import { strokesSelector } from "./modules/strokes/selectors";
import { RootState } from "./types";

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

function App() {
  const canvasRef = useCanvas();
  const currentStroke = useSelector<RootState, RootState["currentStroke"]>(
    currentStrokeSelector
  );
  const historyIndex = useSelector<RootState, RootState["historyIndex"]>(
    historyIndexSelector
  );
  const strokes = useSelector<RootState, RootState["strokes"]>(strokesSelector);
  const dispatch = useDispatch();
  const isDrawing = !!currentStroke.points.length;

  const getCanvasWithContext = useCallback(
    (canvas = canvasRef.current) => {
      return { canvas, context: canvas?.getContext("2d") };
    },
    [canvasRef]
  );

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }

    setCanvasSize(canvas, CANVAS_WIDTH, CANVAS_HEIGHT);

    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 3;
    context.strokeStyle = "black";
  }, [getCanvasWithContext]);

  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) {
      return;
    }

    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color)
    );
  }, [currentStroke, getCanvasWithContext]);

  useEffect(() => {
    const { context, canvas } = getCanvasWithContext();
    if (!context || !canvas) {
      return;
    }

    requestAnimationFrame(() => {
      clearCanvas(canvas);

      strokes.slice(0, strokes.length - historyIndex).forEach((stroke) => {
        drawStroke(context, stroke.points, stroke.color);
      });
    });
  }, [getCanvasWithContext, historyIndex, strokes]);

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX: x, offsetY: y } = nativeEvent;
    dispatch(beginStroke({ x, y }));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({ stroke: currentStroke, historyIndex }));
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX: x, offsetY: y } = nativeEvent;
    dispatch(updateStroke({ x, y }));
  };

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <EditPanel />
      <ColorPanel />
      <FilePanel />
      <ModalLayer />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
      />
    </div>
  );
}

export default App;
