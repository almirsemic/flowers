import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: { token: string | null } = {
  token: localStorage.getItem('token'),
}

export const userTokenSlice = createSlice({
  name: 'userToken',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      if (action.payload !== null) {
        localStorage.setItem('token', action.payload)
        state.token = action.payload
      }else{
        state.token = action.payload
      }
    },
  },
})

export const { setToken } = userTokenSlice.actions

export default userTokenSlice.reducer
