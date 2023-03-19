import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserProfile } from '../Types/types'

const userData = localStorage.getItem('user')
const user = userData ? JSON.parse(userData) : null

const initialState: UserProfile = user || {
  first_name: null,
  id: null,
  last_name: null,
}

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          first_name: action.payload.first_name,
          id: action.payload.id,
          last_name: action.payload.last_name,
        }),
      )
      state.first_name = action.payload.first_name
      state.id = action.payload.id
      state.last_name = action.payload.last_name
    },
  },
})

export const { setProfile } = userProfileSlice.actions

export default userProfileSlice.reducer
