import { combineReducers } from 'redux'
import themes from './ducks/themes'
import navigation from './ducks/navigation'
import users from './ducks/users'

const rootReducer = combineReducers({
  themes,
  navigation,
  users,
})

export default rootReducer
