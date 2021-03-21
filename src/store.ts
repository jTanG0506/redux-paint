import { logger } from 'redux-logger'
import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import historyIndex from './modules/historyIndex/slice'
import currentStroke from './modules/currentStroke/slice'
import strokes from './modules/strokes/slice'

const middleware = [...getDefaultMiddleware(), logger]

export const store = configureStore({
  reducer: combineReducers({
    currentStroke,
    historyIndex,
    strokes,
  }),
  middleware
})
