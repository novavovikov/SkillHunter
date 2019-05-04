import { Action } from 'redux'
import { AppActionTypes } from '../actionTypes/app'
import { ErrorActionTypes } from '../actionTypes/errors'

export interface RequestAppInitialize extends Action {
  type: AppActionTypes.APP_INITIALIZE_REQUEST
}

export interface SetAppInitializeError extends Action {
  type: AppActionTypes.APP_INITIALIZE_ERROR
  payload: string
}

export interface SetAppAsInitialized extends Action {
  type: AppActionTypes.APP_INITIALIZED_SET
}

export interface ClearError extends Action {
  type: ErrorActionTypes.ERROR_CLEAR
  payload: string
}

export interface SetAppError extends Action {
  type: ErrorActionTypes.ERROR_SET
  payload: string
}

export interface ClearAllErrors extends Action {
  type: ErrorActionTypes.ERROR_CLEAR_ALL
}

export type AppAction = RequestAppInitialize | SetAppInitializeError | SetAppAsInitialized
export type ErrorAction = ClearError | ClearAllErrors

export const requestAppInitialize = (): RequestAppInitialize => ({
  type: AppActionTypes.APP_INITIALIZE_REQUEST
})

export const setAppInitializeError = (error: string): SetAppInitializeError => ({
  type: AppActionTypes.APP_INITIALIZE_ERROR,
  payload: error
})

export const setAppAsInitialized = (): SetAppAsInitialized => ({
  type: AppActionTypes.APP_INITIALIZED_SET
})

export const setAppError = (key: string): SetAppError => ({
  type: ErrorActionTypes.ERROR_SET,
  payload: key
})

export const clearError = (key: string): ClearError => ({
  type: ErrorActionTypes.ERROR_CLEAR,
  payload: key
})

export const clearAllErrors = (): ClearAllErrors => ({
  type: ErrorActionTypes.ERROR_CLEAR_ALL
})
