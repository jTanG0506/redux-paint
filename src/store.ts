import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './rootReducer'

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)))
