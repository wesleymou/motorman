import { combineReducers } from 'redux'
import themes from './ducks/themes'
import navigation from './ducks/navigation'
import userList from './ducks/userList'
import user from './ducks/user'

const rootReducer = combineReducers({
  themes,
  navigation,
  userList,
  user,
})

export default rootReducer
