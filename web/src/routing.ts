import Introduction from './containers/Introduction'
import Auth from './containers/Auth'

export const routes = [
  {
    path: '/login',
    exact: true,
    component: Auth,
  },
  {
    path: '/introduction',
    exact: true,
    component: Introduction,
  },
]
