import { combineReducers } from 'redux'
import { app, AppState } from './app'
import { errors, ErrorState } from './errors'

export interface RootState {
  app: AppState
  errors: ErrorState
}

export default () => {
  return combineReducers<RootState>({
    app,
    errors
  })
}
