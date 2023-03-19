import { configureStore } from '@reduxjs/toolkit'
import userTokenReducer from './userTokenSlice'
import modalReducer from './modalSlice'
import userProfileReducer from './userProfileSlice'

const store = configureStore({
  reducer: {
    modals: modalReducer,
    userToken: userTokenReducer,
    user: userProfileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
