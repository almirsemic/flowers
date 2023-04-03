import Styles from './Sighting.module.css'
import profile from '../../assets/Profile.png'
import heart from '../../assets/heart.png'
import comment from '../../assets/comment.png'
import { useEffect, useState } from 'react'
import axios, { CancelTokenSource } from 'axios'
import { Sightings, Sighting } from '../../Types/types'
import Loading from '../Loading/Loading'

const SightingComponent = () => {
  const [sightings, setSightings] = useState<Sighting[] | null>(null)
  useEffect(() => {
    const cancelToken: CancelTokenSource = axios.CancelToken.source()

    async function getSightings(): Promise<void> {
      try {
        const sightingResponse = await axios.get<Sightings>(
          '/api/v1/sightings',
          {
            cancelToken: cancelToken.token,
          },
        )
        if (sightingResponse.status === 200) {
          setSightings(sightingResponse.data.sightings)
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.warn('Request canceled:', error.message)
        } else {
          console.warn(error)
        }
      }
    }
    getSightings()
    return () => {
      cancelToken.cancel('Component unmounted')
    }
  }, [])
  return (
    <div className={Styles.container}>
      <div className={Styles.title}>
        <h3>Sighting List</h3>
      </div>
      {sightings ? (
        <div className={Styles.sighting_wrapper}>
          {sightings?.map((sighting: Sighting) => (
            <div className={Styles.sighting} key={sighting.id}>
              <img
                className={Styles.sighting_image}
                src={sighting.flower.profile_picture}
                alt={sighting.flower.name}
              />
              <div className={Styles.content}>
                <div className={Styles.user}>
                  <img src={profile} alt="user_image" />
                  <p>
                    {sighting.name} <br />{' '}
                    <small>by {sighting.user.full_name}</small>
                  </p>
                </div>
                <div className={Styles.description}>
                  <p>{sighting.description}</p>
                </div>
                <hr />
                <div className={Styles.icons}>
                  <p>
                    <img src={comment} alt="comment" />{' '}
                    {sighting.comments_count} Comments
                  </p>
                  <p>
                    <img src={heart} alt="heart" /> {sighting.likes_count}{' '}
                    Favorites
                  </p>
                </div>
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

export default SightingComponent
