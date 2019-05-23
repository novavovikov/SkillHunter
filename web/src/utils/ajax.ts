import axios from 'axios'
import cookies from 'js-cookie'
import { API } from '../constants/api'
import { ROUTES } from '../constants/routing'

export const ajax = axios.create({
  baseURL: API.BASE_URL,
})

ajax.interceptors.request.use(
  config => {
    const token = cookies.get('authToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  err => Promise.reject(err),
)

ajax.interceptors.response.use(
  config => config,
  err => {
    if (
      err.response &&
      err.response.status === 401 &&
      window.location.pathname !== ROUTES.LOGIN
    ) {
      window.location.href = ROUTES.LOGIN
    }

    return Promise.reject(err)
  },
)
