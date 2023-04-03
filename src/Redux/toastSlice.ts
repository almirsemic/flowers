import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { typeToast } from '../Types/types'

const initialState: typeToast = {
  toast: false,
  message: '',
  color: '',
}
export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<typeToast>) => {
      state.toast = action.payload.toast
      state.message = action.payload.message
      state.color = action.payload.color
    },
  },
})

export const { setToast } = toastSlice.actions

export default toastSlice.reducer
