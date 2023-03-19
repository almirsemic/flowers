import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { modalType } from '../Types/types'

const initialState: modalType = {
  isOpened: false,
  type: '',
}
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<modalType>) => {
      state.isOpened = action.payload.isOpened
      if (action.payload.type) {
        state.type = action.payload.type
      }
    },
  },
})

export const { setModal } = modalSlice.actions

export default modalSlice.reducer
