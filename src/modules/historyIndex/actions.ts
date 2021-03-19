import { createAction } from "@reduxjs/toolkit"
import { Stroke } from "../../types"

export const endStroke = createAction<{
  stroke: Stroke
  historyIndex: number
}>("END_STROKE")

export const undo = createAction<number>("UNDO")

export const redo = createAction("REDO")
