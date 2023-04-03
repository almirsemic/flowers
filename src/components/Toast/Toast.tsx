import Styles from './Toast.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { setToast } from '../../Redux/toastSlice'
import { typeToast } from '../../Types/types'

export default function Toast() {
  const toast: typeToast = useSelector((state: RootState) => state.toast)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setToast({ toast: false, message: '', color: '' }))
    }, 3333)
    return () => clearTimeout(timeout);
  }, [toast.toast, dispatch])

  return (
    <div
      className={`${Styles.toast} ${toast.toast ? Styles.show : ''}`}
      style={{ backgroundColor: toast.color }}
    >
      {toast.message}
    </div>
  )
}
