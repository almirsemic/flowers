import { configureStore } from '@reduxjs/toolkit'
import userTokenReducer from './userTokenSlice'
import modalReducer from './modalSlice'
import userProfileReducer from './userProfileSlice'
import favoriteFlowersReducer from './favoriteFlowersSlice'
import toastReducer from "./toastSlice"

const store = configureStore({
  reducer: {
    modals: modalReducer,
    userToken: userTokenReducer,
    user: userProfileReducer,
    favorites: favoriteFlowersReducer,
    toast: toastReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
