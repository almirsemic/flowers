import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setModal } from '../../Redux/modalSlice'
import Styles from './Modals.module.css'
import axios from 'axios'
import { registationType } from '../../Types/types'

const RegisterModal = () => {
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const first_name = useRef<HTMLInputElement>(null)
  const last_name = useRef<HTMLInputElement>(null)
  const date_of_birth = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [type, setType] = useState('text')
  const dispatch = useDispatch()

  function handleFocus() {
    setType('date')
  }
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault()
    try {
      const user: registationType = {
        email: email.current!.value,
        password: password.current!.value,
        first_name: first_name.current!.value,
        last_name: last_name.current!.value,
        date_of_birth: date_of_birth.current!.value,
      }
      const response = await axios.post<{ auth_token: string }>(
        '/api/v1/users/register',
        user,
      )
      if (response && response.status === 200) {
        dispatch(setModal({ isOpened: true, type: 'SuccessfulRegistration' }))
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
          onClick={() => dispatch(setModal({ isOpened: false, type: '' }))}
        >
          x
        </button>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h3 className={Styles.title}>Create an Account</h3>
          <input
            type="text"
            placeholder="First Name"
            ref={first_name}
            required
          />
          <input type="text" placeholder="Last Name" ref={last_name} required />
          <input
            required
            type={type}
            ref={date_of_birth}
            placeholder="Date of Birth"
            onFocus={handleFocus}
            onBlur={() => setType('text')}
          />
          <input type="email" placeholder="Email Adress" ref={email} required />
          <input
            type="password"
            placeholder="Password"
            ref={password}
            required
          />
          <button className={Styles.button} type="submit">
            Create Account
          </button>
          {errorMessage && (
            <p className={Styles.error_message}>{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default RegisterModal
