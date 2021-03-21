import { logger } from 'redux-logger'
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  Action,
  ThunkAction,
} from '@reduxjs/toolkit'
import historyIndex from './modules/historyIndex/slice'
import currentStroke from './modules/currentStroke/slice'
import strokes from './modules/strokes/slice'
import modalState from './modules/modals/slice'
import { projectsList } from './modules/projectsList/slice'
import { RootState } from './types'

const middleware = [...getDefaultMiddleware(), logger]

export const store = configureStore({
  reducer: combineReducers({
    currentStroke,
    historyIndex,
    strokes,
    projectsList,
    modalState,
  }),
  middleware
})

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
