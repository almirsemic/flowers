import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { favoriteFlowersState } from '../Types/types'

const initialState: favoriteFlowersState[] | [] = []

export const favoriteFlowersSlice = createSlice({
  name: 'flowerFavorite',
  initialState,
  reducers: {
    setFavorite: (state, action: PayloadAction<favoriteFlowersState>) => {
       if(action.payload.type === "ADD"){
        return [...state, action.payload]
      }else if (action.payload.type === "REMOVE"){
        return state.filter(favorite => favorite.id !== action.payload.id && favorite.flower_id !== action.payload.flower_id)
      }else if(action.payload.type === 'CLEAR'){
        return state = []
      }
      return state;
    },
  },
})

export const { setFavorite } = favoriteFlowersSlice.actions

export default favoriteFlowersSlice.reducer
