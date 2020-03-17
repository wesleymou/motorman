// Actions
const APP_ROUTE_CHANGE = 'app/navigation/APP_ROUTE_CHANGE'

// Reducer
const defaultState = {
  rootNavigationRoute: '',
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case APP_ROUTE_CHANGE:
      return { ...state, rootNavigationRoute: action.route }
    default:
      return state
  }
}

// Action creators
export const changeRoute = route => ({ type: APP_ROUTE_CHANGE, route })
