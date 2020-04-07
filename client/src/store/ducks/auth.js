import api from '../../services/api'
import * as auth from '../../services/auth'

// Actions
const LOGGED_IN = 'app/auth/LOGGED_IN'
const LOGGED_OUT = 'app/auth/LOGGED_OUT'
const USER_UPDATED = 'app/auth/USER_UPDATED'
const FORGOT_PASSWORD = 'app/auth/FORGOT_PASSWORD'
const PASSWORD_RESET = 'app/auth/PASSWORD_RESET'
const RESET_PASSWORD_TOKEN_VERIFIED = 'app/auth/RESET_PASSWORD_TOKEN_VERIFIED'

// Reducer
const defaultState = {
  currentUser: null,
  loginDate: null,
}

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case LOGGED_IN: {
      const tokenPayload = auth.getPayload()
      return {
        ...state,
        currentUser: { ...tokenPayload },
      }
    }

    case FORGOT_PASSWORD:
    case LOGGED_OUT: {
      return defaultState
    }

    case USER_UPDATED: {
      return { ...state, currentUser: { ...payload } }
    }

    default:
      return state
  }
}

// Action creators
export const userLoggedIn = token => ({ type: LOGGED_IN, payload: token })
export const userLoggedOut = () => ({ type: LOGGED_OUT })
export const userUpdated = user => ({ type: USER_UPDATED, payload: user })
export const forgotPassword = () => ({ type: FORGOT_PASSWORD })
export const passwordReset = () => ({ type: PASSWORD_RESET })
export const resetPasswordTokenVerified = () => ({ type: RESET_PASSWORD_TOKEN_VERIFIED })

// Thunks
export const login = user => dispatch =>
  api.post(`/authenticate`, user).then(({ data }) => {
    auth.login(data)
    dispatch(userLoggedIn(data.token))
  })

export const logout = () => dispatch => {
  auth.logout()
  dispatch(userLoggedOut())
}

export const requestPasswordRecoveryMail = email => dispatch =>
  api.post(`/forgot-password/request/${email}`).then(() => {
    auth.logout()
    dispatch(forgotPassword())
  })

export const resetPassword = payload => dispatch =>
  api.post(`/forgot-password/change`, payload).then(() => dispatch(passwordReset()))

export const verifyResetPasswordToken = token => dispatch =>
  api.get(`/forgot-password/verify/${token}`).then(() => dispatch(resetPasswordTokenVerified()))
