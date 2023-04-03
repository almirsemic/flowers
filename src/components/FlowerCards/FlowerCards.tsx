import Styles from './FlowerCards.module.css'
import photo from '../../assets/Fill.png'
import { favoriteFlowersState, Flower, Flowers } from '../../Types/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { useNavigate } from 'react-router-dom'
import { useCallback, useContext } from 'react'
import FlowerContext from '../../Contexts/flowerContext'
import Toast from '../Toast/Toast'
import { setToast } from '../../Redux/toastSlice'

const FlowerCards: React.FC<{ type: string; flowers?: Flowers | null }> = ({
  type,
  flowers,
}) => {
  const { handleFavorites } = useContext(FlowerContext)
  const data: {
    favoriteFlowers: favoriteFlowersState[] | []
    token: string | null
  } = useSelector((state: RootState) => {
    return {
      favoriteFlowers: state.favorites,
      token: state.userToken.token,
    }
  })
  const flowerList = flowers?.flowers || []
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleAddFavorites(
    event: React.MouseEvent<HTMLDivElement>,
    flower_id: number,
  ) {
    event.stopPropagation()
    handleFavorites(data, flower_id)
  }
  const showToastMessage = useCallback((event: React.MouseEvent<HTMLParagraphElement>) => {
    event.stopPropagation()
    if(data.token === null){
      dispatch(setToast({toast: true, message: 'Please login !', color: '#cf6565'}))
    }
  }, [data.token, dispatch]);
  return (
    <div className={Styles.container}>
      <div className={Styles.flowers}>
        {(type === 'home' && flowerList
          ? flowerList
          : data.favoriteFlowers
        ).map((flower: Flower | favoriteFlowersState) => (
          <div
            onClick={() =>
              navigate(
                `/flower/${
                  type === 'home'
                    ? flower.id
                    : (flower as favoriteFlowersState).flower_id
                }`,
              )
            }
            className={Styles.flower}
            key={
              type === 'home'
                ? flower.id
                : (flower as favoriteFlowersState).flower_id
            }
            style={{ backgroundImage: `url(${flower.profile_picture})` }}
          >
            {data.token && (
              <div
                className={Styles.star}
                onClick={(event) =>
                  handleAddFavorites(
                    event,
                    type === 'home'
                      ? flower.id
                      : (flower as favoriteFlowersState).flower_id,
                  )
                }
                style={{
                  backgroundColor: data.favoriteFlowers.some(
                    (favorite) =>
                      favorite.flower_id ===
                      (type === 'home'
                        ? flower.id
                        : (flower as favoriteFlowersState).flower_id),
                  )
                    ? '#eaa79e'
                    : '#fff',
                }}
              >
                <img src={photo} alt="star" />
              </div>
            )}
            <div className={Styles.flower_name}>
              <h3>{flower.name}</h3>
              <small>{flower.latin_name}</small>
              <p onClick={(event) => showToastMessage(event)}>{flower.sightings} sightings</p>
            </div>
          </div>
        ))}
      </div>
      <Toast />
    </div>
  )
}

export default FlowerCards
