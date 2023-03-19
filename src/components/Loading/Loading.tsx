import Styles from './Loading.module.css'

interface Props {
  error?: string | null
  onNavigate?: () => void
}
const Loading: React.FC<Props> = ({ error, onNavigate }) => {
  return (
    <div className={Styles.loaded_wrapper}>
      <div className={Styles.lds_ripple}>
        <div></div>
        <div></div>
      </div>
      {error && (
        <div className={Styles.error_wrapper}>
          <p className={Styles.error}>{error?.toLocaleUpperCase()}</p>
          <button className={Styles.button} onClick={onNavigate}>
            Home
          </button>
        </div>
      )}
    </div>
  )
}

export default Loading
