import axios from 'axios'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setModal } from '../../Redux/modalSlice'
import { setToken } from '../../Redux/userTokenSlice'
import { setProfile } from '../../Redux/userProfileSlice'
import { loginType, User } from '../../Types/types'
import Styles from './Modals.module.css'

const LoginModal = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault()
    try {
      const user: loginType = {
        email: email.current!.value,
        password: password.current!.value,
      }
      const response = await axios.post<{ auth_token: string }>(
        '/api/v1/users/login',
        user,
      )
      if (response.status === 200) {
        dispatch(setToken(response.data.auth_token))
        dispatch(setModal({ isOpened: true, type: 'SuccessfulLogin' }))
        try {
          const profile = await axios.get<User>('/api/v1/users/me', {
            headers: {
              Authorization: `Bearer ${response.data.auth_token}`,
            },
          })
          dispatch(setProfile(profile.data.user))
        } catch (profileError) {
          console.error(profileError)
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error)
      } else {
        console.error(error)
      }
    }
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
        <form
          className={Styles.form}
          onSubmit={handleSubmit}
          style={{ height: '50%' }}
        >
          <h3 className={Styles.title}>Welcome Back</h3>
          <input type="email" placeholder="Email Adress" ref={email} required />
          <input
            type="password"
            placeholder="Password"
            ref={password}
            required
          />
          <button className={Styles.button} type="submit">
            Login to your Account
          </button>
          {errorMessage && (
            <p className={Styles.error_message}>{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginModal
