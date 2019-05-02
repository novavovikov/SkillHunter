import { put, fork, takeEvery } from 'redux-saga/effects'
import { AppActionTypes } from '../actionTypes/app'
import actionCreators from '../actions'

export function* initializeApp() {
  try {
    console.debug('try to initialize')

    // throw new Error('error')

    yield put(actionCreators.setAppAsInitialized())
  } catch (error) {
    yield put(actionCreators.setAppInitializeError(error))
  }
}

export function* watchInitializationRequest() {
  yield takeEvery(AppActionTypes.APP_INITIALIZE_REQUEST, initializeApp)
}

export default function* root() {
  yield fork(watchInitializationRequest)
}
