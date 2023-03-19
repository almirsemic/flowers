import { useSelector } from 'react-redux'
import Modal from './components/Modal/Modal'
import Navbar from './components/Navbar/Navbar'
import { RootState } from './Redux/store'
import Router from './Router/router'

function App() {
  const modal: boolean = useSelector((state: RootState) => state.modals.isOpened)
  return (
    <div className="App">
      <Navbar />
      {modal && <Modal />}
      <Router />
    </div>
  )
}

export default App
