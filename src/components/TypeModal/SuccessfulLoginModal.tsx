import { useDispatch } from 'react-redux'
import { setModal } from '../../Redux/modalSlice'
import Styles from './Modals.module.css'

const SuccessfulLoginModal = () => {
  const dispatch = useDispatch()
  return (
    <div className={Styles.modal}>
      <div className={Styles.content_modal}>
        <button
          className={Styles.close_btn}
          onClick={() => dispatch(setModal({ isOpened: false }))}
        >
          x
        </button>
        <div className={Styles.successful}>
          <h3 className={Styles.title}>
            Congratulations! <br /> <br /> <br /> You have successfully logged
            into FlowrSpot!
          </h3>
          <button
            className={Styles.button}
            type="submit"
            onClick={() => dispatch(setModal({ isOpened: false }))}
          >
            OK
          </button>
          <button
            className={Styles.button}
            type="submit"
            onClick={() =>
              dispatch(setModal({ isOpened: true, type: 'Profile' }))
            }
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessfulLoginModal
