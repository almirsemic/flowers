import { useNavigate } from 'react-router-dom'
import Styles from './NotFound.module.css'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className={Styles.loaded_wrapper}>
      <div className={Styles.lds_hourglass}></div>
      <p style={{color: "red"}}>Wrong URL !</p>
      <button className={Styles.button} onClick={() => navigate('/')}>
        <p>Home</p>
      </button>
    </div>
  )
}

export default NotFound
