import { Route, Routes } from 'react-router-dom'
import FlowerDetail from '../components/FlowerDetail/FlowerDetail'
import Home from '../components/Home/Home'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flower/:id" element={<FlowerDetail />} />
    </Routes>
  )
}

export default Router