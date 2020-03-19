import api from '../../services/api'

// Actions
const FETCH_USERS = 'app/users/FETCH_USERS'
const FETCH_USERS_SUCCESS = 'app/users/FETCH_USERS_SUCCESS'
const FETCH_USERS_FAIL = 'app/users/FETCH_USERS_FAIL'
const SELECT_USER = 'app/users/SELECT_USER'

// Reducer
const defaultState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCH_USERS:
      return { users: [], loading: true, error: null }
    case FETCH_USERS_SUCCESS:
      return { users: action.users, loading: false, error: null }
    case FETCH_USERS_FAIL:
      return { ...state, loading: false, error: action.error }
    case SELECT_USER:
      return { ...state, selectedUser: state.users.find(user => user.id === action.id) }
    default:
      return state
  }
}

// Action creators
export const startFetchingUsers = () => ({ type: FETCH_USERS })
export const getUsers = users => ({ type: FETCH_USERS_SUCCESS, users })
export const getUsersFail = error => ({ type: FETCH_USERS_FAIL, error })
export const selectUser = id => ({ type: SELECT_USER, id })

// Thunks
export const fetchUsers = () => async dispatch => {
  try {
    dispatch(startFetchingUsers())
    const { data } = await api.get('/user')
    dispatch(getUsers(data))
  } catch (error) {
    dispatch(getUsersFail(error))
  }
}
