import Styles from './Navbar.module.css'
import photo from '../../assets/Logo.png'
import profile from '../../assets/Profile.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../Redux/modalSlice'
import { RootState } from '../../Redux/store'
import { UserProfile } from '../../Types/types'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const userInfoAndToken: {
    token: string | null
    user: UserProfile
  } = useSelector((state: RootState) => {
    return {
      token: state.userToken.token,
      user: state.user,
    }
  })
  const [isChecked, setIsChecked] = useState(false)
  const dispatch = useDispatch()

  function handleModal(arg: string): void {
    dispatch(setModal({ isOpened: true, type: arg }))
    setIsChecked(false)
  }
  function handleNavigate(route: string): void {
    setIsChecked(false)
   if (route === '/favorites' && userInfoAndToken.token) {
      navigate(route)
    } else {
      navigate(route)
    }
  }
  return (
    <nav>
      <input
        id="nav-toggle"
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        style={{ position: 'absolute', top: '-100px' }}
      />
      <div className={Styles.logo}>
        <img src={photo} alt="logo" />
        <h3 onClick={() => handleNavigate('/')}>FlowrSpot</h3>
      </div>
      <ul className={Styles.links}>
        <li>
          <p onClick={() => handleNavigate('/')}>Flowers</p>
        </li>
        <li>
          <p onClick={() => handleNavigate('/sighting')}>Latest Sightings</p>
        </li>
        <li onClick={() => handleNavigate('/favorites')}>
          <p>Favorites</p>
        </li>
        <li>
          {!userInfoAndToken.token ? (
            <p className={Styles.login} onClick={() => handleModal('Login')}>
              Login
            </p>
          ) : (
            <p>
              {userInfoAndToken.user.first_name +
                ' ' +
                userInfoAndToken.user.last_name}
            </p>
          )}
        </li>
        <li>
          {!userInfoAndToken.token ? (
            <p
              className={Styles.new_account}
              onClick={() => handleModal('NewAccount')}
            >
              New Account
            </p>
          ) : (
            <p
              className={Styles.profile_photo}
              onClick={() => handleModal('Profile')}
            >
              <img src={profile} alt="profile" />
            </p>
          )}
        </li>
      </ul>
      <label htmlFor="nav-toggle" className={Styles.icon_burger}>
        <div className={Styles.line}></div>
        <div className={Styles.line}></div>
        <div className={Styles.line}></div>
      </label>
    </nav>
  )
}

export default Navbar
