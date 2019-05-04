import axios from 'axios'
import cookies from 'js-cookie'
import { Linking } from 'react-native'
import { LOGIN_ROUTE } from '../constants/routes'

export const ajax = axios.create({
  baseURL: '/api/'
})

ajax.interceptors.request.use(
  config => {
    const token = cookies.get('authToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  err => Promise.reject(err)
)

ajax.interceptors.response.use(
  config => config,
  err => {
    if (err.response && err.response.status === 401) {
      Linking.openURL(LOGIN_ROUTE).catch(error => console.error('An error occurred', error))
    }

    return Promise.reject(err)
  }
)
