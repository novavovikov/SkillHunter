import Login from './containers/Login'
import Skills from './containers/Skills'

export const routes = {
  Home: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  },
  skills: {
    screen: Skills,
    navigationOptions: {
      title: 'Skills'
    }
  }
}
