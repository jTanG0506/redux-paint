import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../types"

const initialState: RootState["modalState"] = {
  isShown: false,
  modalName: null,
}

const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show: (state, action: PayloadAction<string>) => {
      state.isShown = true
      state.modalName = action.payload
    },
    hide: (state) => {
      state.isShown = true
      state.modalName = null
    }
  }
})

export default slice.reducer
export const { show, hide } = slice.actions
