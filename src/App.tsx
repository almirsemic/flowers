import { useSelector } from 'react-redux'
import Modal from './components/Modal/Modal'
import Navbar from './components/Navbar/Navbar'
import useFetchFavorites from './CustomHooks/useFetchFavorites'
import { RootState } from './Redux/store'
import Router from './Router/router'

function App() {
  const modal: boolean = useSelector((state: RootState) => state.modals.isOpened)
  useFetchFavorites()
  return (
    <div className="App">
      <Navbar />
      {modal && <Modal />}
      <Router />
    </div>
  )
}

export default App
