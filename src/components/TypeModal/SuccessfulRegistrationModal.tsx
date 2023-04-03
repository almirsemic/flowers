import { useDispatch } from 'react-redux'
import { setModal } from '../../Redux/modalSlice'
import Styles from './Modals.module.css'

const SuccessfulRegistrationModal = () => {
  const dispatch = useDispatch()
  return (
    <div className={Styles.modal}>
      <div className={Styles.content_modal}>
        <button
          className={Styles.close_btn}
          onClick={() => dispatch(setModal({ isOpened: false, type: '' }))}
        >
          x
        </button>
        <div className={Styles.successful}>
          <h3 className={Styles.title}>
            Congratulations! <br /> <br /> <br /> You have successfully signed
            up for FlowrSpot!
          </h3>
          <button
            className={Styles.button}
            type="submit"
            onClick={() =>
              dispatch(setModal({ isOpened: true, type: 'Login' }))
            }
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessfulRegistrationModal
