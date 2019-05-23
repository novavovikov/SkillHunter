import { combineReducers } from 'redux'
import { user, UserState } from './user'

interface RootState {
  user: UserState
}

export default () => {
  return combineReducers<RootState>({
    user,
  })
}
