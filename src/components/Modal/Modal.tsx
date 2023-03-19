import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { modalType } from '../../Types/types'
import LoginModal from '../TypeModal/LoginModal'
import ProfileModal from '../TypeModal/ProfileModal'
import RegisterModal from '../TypeModal/RegisterModal'
import SuccessfulLoginModal from '../TypeModal/SuccessfulLoginModal'
import SuccessfulRegistrationModal from '../TypeModal/SuccessfulRegistrationModal'

const Modal = () => {
  const modal: modalType = useSelector((state: RootState) => state.modals)
  return (
    <div>
      {modal.isOpened && modal.type === 'NewAccount' ? (
        <RegisterModal />
      ) : modal.isOpened && modal.type === 'Login' ? (
        <LoginModal />
      ) : modal.isOpened && modal.type === 'Profile' ? (
        <ProfileModal />
      ) : modal.isOpened && modal.type === 'SuccessfulRegistration' ? (
        <SuccessfulRegistrationModal />
      ) : modal.isOpened && modal.type === 'SuccessfulLogin' ? (
        <SuccessfulLoginModal />
      ) : (
        ''
      )}
    </div>
  )
}

export default Modal
