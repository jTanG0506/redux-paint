import { RootState } from './types'
import { Action, BEGIN_STROKE, END_STROKE, REDO, SET_STROKE_COLOR, UNDO, UPDATE_STROKE } from './actions'

const initialState: RootState = {
  currentStroke: { points: [], color: '#000' },
  strokes: [],
  historyIndex: 0,
}

export const rootReducer = (
  state: RootState = initialState,
  action: Action
): RootState => {
  switch (action.type) {
    case BEGIN_STROKE: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [action.payload],
        }
      }
    }
    case UPDATE_STROKE: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [...state.currentStroke.points, action.payload],
        }
      }
    }
    case END_STROKE: {
      if (!state.currentStroke.points.length) {
        return state
      }
      return {
        ...state,
        currentStroke: { ...state.currentStroke, points: [] },
        strokes: [...state.strokes.slice(0, state.strokes.length - state.historyIndex), state.currentStroke],
        historyIndex: 0,
      }
    }
    case SET_STROKE_COLOR: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          ...{ color: action.payload }
        }
      }
    }
    case UNDO: {
      return {
        ...state,
        historyIndex: Math.min(state.historyIndex + 1, state.strokes.length)
      }
    }
    case REDO: {
      return {
        ...state,
        historyIndex: Math.max(state.historyIndex - 1, 0)
      }
    }
    default:
      return state
  }
}
