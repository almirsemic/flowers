import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFavorite } from '../Redux/favoriteFlowersSlice'
import { RootState } from '../Redux/store'
import { AllFlowersFavorite } from '../Types/types'

const useFetchFavorites = () => {
  const userToken: string | null = useSelector(
    (state: RootState) => state.userToken.token,
  )
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchFavorites(): Promise<void> {
      try {
        const flowersFavorite = await axios.get<AllFlowersFavorite>(
          '/api/v1/flowers/favorites',
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        )
        if (flowersFavorite.status === 200) {
          for (const favoriteFlower of flowersFavorite.data.fav_flowers) {
            dispatch(
              setFavorite({
                id: favoriteFlower.id,
                flower_id: favoriteFlower.flower.id,
                type: 'ADD',
                name: favoriteFlower.flower.name,
                latin_name: favoriteFlower.flower.latin_name,
                sightings: favoriteFlower.flower.sightings,
                profile_picture: favoriteFlower.flower.profile_picture,
              }),
            )
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    if (userToken) {
      fetchFavorites()
    }
  }, [dispatch, userToken])
}

export default useFetchFavorites
