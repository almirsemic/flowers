import useFetchFlowers from '../../CustomHooks/useFetchFlowers'
import { Flower, Flowers } from '../../Types/types'
import Styles from './Home.module.css'
import photo from '../../assets/Fill.png'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'

const Home = () => {
  const flowersResponse: Flowers | null = useFetchFlowers('api/v1/flowers')
  const isAuthenticated: string | null = useSelector(
    (state: RootState) => state.userToken.token,
  )
  const flowerList = flowersResponse?.flowers || []
  const navigate = useNavigate()
  return (
    <div className={Styles.container}>
      {flowersResponse ? (
        <div className={Styles.flowers}>
          {flowerList.map((flower: Flower) => (
            <div
              onClick={() => navigate(`/flower/${flower.id}`)}
              className={Styles.flower}
              key={flower.id}
              style={{ backgroundImage: `url(${flower.profile_picture})` }}
            >
              {isAuthenticated && (
                <div className={Styles.star}>
                  <img src={photo} alt="star" />
                </div>
              )}
              <div className={Styles.flower_name}>
                <h3>{flower.name}</h3>
                <small>{flower.latin_name}</small>
                <p>{flower.sightings} sightings</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}
export default Home
