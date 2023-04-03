import axios, { CancelTokenSource } from 'axios'
import { createContext } from 'react'
import { useDispatch } from 'react-redux'
import { setFavorite } from '../Redux/favoriteFlowersSlice'
import { setToast } from '../Redux/toastSlice'
import { AddFlowerFavorite, favoriteFlowersState } from '../Types/types'

interface FlowerContextValue {
  handleFavorites: (
    data: {
      favoriteFlowers: favoriteFlowersState[] | []
      token: string | null
    },
    flower_id: number,
  ) => Promise<void>
}

const FlowerContext = createContext<FlowerContextValue>({
  handleFavorites: async () => Promise.resolve(),
})

export const FlowerProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()

  async function handleFavorites(
    data: {
      favoriteFlowers: favoriteFlowersState[] | []
      token: string | null
    },
    flower_id: number,
  ) {
    const cancelToken: CancelTokenSource = axios.CancelToken.source()
    const foundFavorite = data.favoriteFlowers.find(
      (favorite) => favorite.flower_id === flower_id,
    )
    try {
      if (foundFavorite) {
        const deleteResponse = await axios.delete<AddFlowerFavorite>(
          `/api/v1/flowers/${foundFavorite.flower_id}/favorites/${foundFavorite.id}`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          },
        )
        if (deleteResponse.status === 200) {
          dispatch(setToast({toast: true, message: 'Deleted successfully !', color: '#cf6565'}))
          dispatch(
            setFavorite({
              id: deleteResponse.data.fav_flower.id,
              flower_id: deleteResponse.data.fav_flower.flower.id,
              type: 'REMOVE',
            }),
          )
        }
      } else {
        const addResponse = await axios.post<AddFlowerFavorite>(
          `/api/v1/flowers/${flower_id}/favorites`,
          {
            cancelToken: cancelToken.token,
          },
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          },
        )
        if (addResponse.status === 200) {
          dispatch(setToast({toast: true, message: 'Added successfully !', color: '#00d800'}))
          dispatch(
            setFavorite({
              id: addResponse.data.fav_flower.id,
              flower_id: addResponse.data.fav_flower.flower.id,
              type: 'ADD',
              name: addResponse.data.fav_flower.flower.name,
              latin_name: addResponse.data.fav_flower.flower.latin_name,
              sightings: addResponse.data.fav_flower.flower.sightings,
              profile_picture:
                addResponse.data.fav_flower.flower.profile_picture,
            }),
          )
        }
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.warn('Request canceled:', error.message)
      } else {
        console.warn(error)
      }
    }
  }
  return (
    <FlowerContext.Provider value={{ handleFavorites }}>
      {children}
    </FlowerContext.Provider>
  )
}

export default FlowerContext
