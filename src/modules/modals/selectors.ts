import { RootState } from '../../types'

export const modalStateSelector = (state: RootState) => state.modalState
export const modalIsShownSelector = (state: RootState) => state.modalState.isShown
export const modalNameSelector = (state: RootState) => state.modalState.modalName
