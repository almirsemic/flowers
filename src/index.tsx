import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import axiosInstance from './Axios/axiosInstance'
import axios from 'axios'
import { Provider } from 'react-redux'
import store from './Redux/store'

axios.defaults.baseURL = axiosInstance.defaults.baseURL
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
