import { useNavigate, useParams } from 'react-router-dom'
import Styles from './FlowerDetail.module.css'
import photo from '../../assets/Fill.png'
import Loading from '../Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import useFetchFlower from '../../CustomHooks/useFetchFlower'
import { favoriteFlowersState } from '../../Types/types'
import { useCallback, useContext } from 'react'
import FlowerContext from '../../Contexts/flowerContext'
import Toast from '../Toast/Toast'
import { setToast } from '../../Redux/toastSlice'

const FlowerDetail = () => {
  const { handleFavorites } = useContext(FlowerContext)
  const { id } = useParams()
  const data: {
    favoriteFlowers: favoriteFlowersState[] | []
    token: string | null
  } = useSelector((state: RootState) => {
    return {
      favoriteFlowers: state.favorites,
      token: state.userToken.token,
    }
  })
  const { flower, error } = useFetchFlower('api/v1/flowers/', id)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function onNavigate() {
    navigate('/')
  }
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
    <div className={Styles.flower_wrapper}>
      <div
        style={{ backgroundImage: `url(${flower?.flower.profile_picture})` }}
        className={Styles.flower_background}
      >
        <img src={flower?.flower.profile_picture} alt="flower" />
        <div className={Styles.flower_info}>
          <div>
            <div className={Styles.star}>
              {data.token && (
                <p
                 onClick={(event) => handleAddFavorites(event, flower!.flower.id)}
                  style={{
                    backgroundColor: data.favoriteFlowers.some(
                      (favorite) => favorite.flower_id === flower?.flower.id,
                    )
                      ? '#eaa79e'
                      : '#fff',
                  }}
                >
                  <img src={photo} alt="star" />
                </p>
              )}
              <h3 onClick={(event) => showToastMessage(event)}>{flower?.flower.sightings} sightings</h3>
            </div>
            <h2>
              {flower?.flower.name} <br />
              <small>{flower?.flower.latin_name}</small>
            </h2>
          </div>
        </div>
      </div>
      <div className={Styles.description}>
        <p>{flower?.flower.description}</p>
      </div>
      <div className={Styles.home_button}>
        <button
          data-text="Awesome"
          className={Styles.button}
          onClick={() => navigate('/')}
        >
          <span className={Styles.actual_text}>&nbsp;Home&nbsp;</span>
          <span className={Styles.hover_text} aria-hidden="true">
            &nbsp;Home&nbsp;
          </span>
        </button>
      </div>
      {!flower && <Loading error={error} onNavigate={onNavigate} />}
      <Toast />
    </div>
  )
}

export default FlowerDetail
