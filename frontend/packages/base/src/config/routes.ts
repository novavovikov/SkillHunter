import { HOME_SCREEN, LOGIN_SCREEN, SKILLS_SCREEN } from '../constants/screens'
import Home from '../containers/Home'
import Login from '../containers/Login'
import Skills from '../containers/Skills'

export const routes = {
  [HOME_SCREEN]: {
    screen: Home,
    navigationOptions: {
      title: 'Home'
    }
  },
  [LOGIN_SCREEN]: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  },
  [SKILLS_SCREEN]: {
    screen: Skills,
    navigationOptions: {
      title: 'Skills'
    }
  }
}
