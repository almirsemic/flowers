import Styles from './Modals.module.css'
import photo from '../../assets/Profile.png'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../Redux/modalSlice'
import { setToken } from '../../Redux/userTokenSlice'
import { RootState } from '../../Redux/store'
import { UserProfile } from '../../Types/types'
import { setProfile } from '../../Redux/userProfileSlice'

const ProfileModal = () => {
  const profile: UserProfile = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  function handleLogout() {
    localStorage.clear()
    dispatch(setToken(null))
    dispatch(setModal({ isOpened: false, type: '' }))
    dispatch(setProfile({ first_name: null, id: null, last_name: null }))
  }
  return (
    <div className={Styles.modal}>
      <div className={Styles.content_modal}>
        <button
          className={Styles.close_btn}
          onClick={() => dispatch(setModal({ isOpened: false }))}
        >
          x
        </button>
        <div className={Styles.profile}>
          <div className={Styles.photo_and_user_name}>
            <img src={photo} alt="user_photo" className={Styles.photo} />
            <h3>
              {profile.first_name} {profile.last_name} <br />
              <small>000 sightings</small>
            </h3>
          </div>
          <div className={Styles.personal_data}>
            <h3>
              <small>First Name</small>
              <br /> {profile.first_name}
            </h3>
            <h3>
              <small>Last Name</small>
              <br /> {profile.last_name}
            </h3>
            <h3>
              <small>Date of Birth</small>
              <br /> mm dd, yyyy
            </h3>
            <h3>
              <small>Email Address</small>
              <br /> email@email.com
            </h3>
          </div>
          <div className={Styles.logout}>
            <button className={Styles.button} onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
