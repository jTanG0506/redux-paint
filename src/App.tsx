import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { beginStroke, endStroke, updateStroke } from "./actions";
import { clearCanvas, drawStroke, setCanvasSize } from "./canvasUtils";
import { ColorPanel } from "./ColorPanel";
import { EditPanel } from "./EditPanel";
import {
  currentStrokeSelector,
  historyIndexSelector,
  strokesSelector,
} from "./selectors";

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentStroke = useSelector(currentStrokeSelector);
  const strokes = useSelector(strokesSelector);
  const historyIndex = useSelector(historyIndexSelector);
  const dispatch = useDispatch();
  const isDrawing = !!currentStroke.points.length;

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
  }, []);

  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) {
      return;
    }

    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color)
    );
  }, [currentStroke]);

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
  }, [historyIndex, strokes]);

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext("2d") };
  };

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke(offsetX, offsetY));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke());
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke(offsetX, offsetY));
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
