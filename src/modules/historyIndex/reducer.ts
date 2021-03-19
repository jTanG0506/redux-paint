import { createReducer } from "@reduxjs/toolkit";
import { RootState } from "../../types";
import { endStroke, redo, undo } from "./actions";

const initialState: RootState["historyIndex"] = 0

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(undo, (state, action) => {
    console.log(action.payload)
    return Math.min(state + 1, action.payload)
  })
  builder.addCase(redo, (state, action) => {
    return Math.max(state - 1, 0)
  })
  builder.addCase(endStroke, (state, action) => {
    return 0
  })
})
