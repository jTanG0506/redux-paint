import { createReducer } from '@reduxjs/toolkit'
import { endStroke } from '../historyIndex/actions'
import { beginStroke, setStrokeColor, updateStroke } from './actions'
import { RootState } from '../../types'

const initialState: RootState["currentStroke"] = { points: [], color: "#000" }

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(beginStroke, (state, action) => {
    state.points = [action.payload]
  })
  builder.addCase(updateStroke, (state, action) => {
    state.points.push(action.payload)
  })
  builder.addCase(setStrokeColor, (state, action) => {
    state.color = action.payload
  })
  builder.addCase(endStroke, (state, action) => {
    state.points = []
  })
})
