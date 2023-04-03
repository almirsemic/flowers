import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Favorites from '../components/Favorites/Favorites'
import FlowerDetail from '../components/FlowerDetail/FlowerDetail'
import Home from '../components/Home/Home'
import NotFound from '../components/NotFound/NotFound'
import SightingComponent from '../components/Sighting/Sighting'
import { setToast } from '../Redux/toastSlice'

const Router = () => {
  const isAuthenticated = localStorage.getItem('token');
  const location = useLocation();
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (location.pathname === '/favorites' && !isAuthenticated) {
      dispatch(
        setToast({ toast: true, message: 'Please login!', color: '#cf6565' })
      );
    }
  }, [location, isAuthenticated, dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flower/:id" element={<FlowerDetail />} />
      <Route path="/favorites" element={isAuthenticated ? <Favorites /> : <Navigate to="/" replace />} />
      <Route path="/sighting" element={<SightingComponent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
