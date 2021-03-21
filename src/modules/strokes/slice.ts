import { createSlice } from "@reduxjs/toolkit"
import { endStroke } from "../sharedActions"
import { RootState } from "../../types"

const initialStrokes: RootState["strokes"] = []

export const strokes = createSlice({
  name: "strokes",
  initialState: initialStrokes,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state, action) => {
      const { historyIndex, stroke } = action.payload
      if (historyIndex === 0) {
        state.push(stroke);
      } else {
        state.splice(-historyIndex, historyIndex, stroke)
      }
    })
  }
})

export default strokes.reducer
