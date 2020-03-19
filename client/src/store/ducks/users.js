import api from '../../services/api'

// Actions
const USER_FETCHED = 'app/users/USER_FETCHED'
const USER_SELECTED = 'app/users/USER_SELECTED'

// Reducer
const defaultState = {
  users: [],
  selectedUser: null,
}

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case USER_FETCHED:
      return { users: payload.users, loading: false, error: null }
    case USER_SELECTED:
      return { ...state, selectedUser: state.users.find(user => user.id === payload.id) }
    default:
      return state
  }
}

// Action creators
export const userFetched = users => ({ type: USER_FETCHED, payload: { users } })
export const selectUser = id => ({ type: USER_SELECTED, payload: { id } })

// Thunks
export const fetchUsers = () => dispatch =>
  api.get('/user').then(({ data }) => dispatch(userFetched(data)))
