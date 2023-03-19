import { useNavigate, useParams } from 'react-router-dom'
import Styles from './FlowerDetail.module.css'
import photo from '../../assets/Fill.png'
import Loading from '../Loading/Loading'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import useFetchFlower from '../../CustomHooks/useFetchFlower'

const FlowerDetail = () => {
  const { id } = useParams()
  const token: string | null = useSelector(
    (state: RootState) => state.userToken.token,
  )
  const { flower, error } = useFetchFlower('api/v1/flowers/', id)
  const navigate = useNavigate()
  function onNavigate() {
    navigate('/')
  }
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
              {token && (
                <p>
                  <img src={photo} alt="star" />
                </p>
              )}
              <h3>{flower?.flower.sightings} sightings</h3>
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
    </div>
  )
}

export default FlowerDetail
