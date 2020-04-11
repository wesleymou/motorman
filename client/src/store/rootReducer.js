import { combineReducers } from 'redux'
import themes from './ducks/themes'
import navigation from './ducks/navigation'
import userList from './ducks/userList'
import user from './ducks/user'
import timesList from './ducks/timesList'
import time from './ducks/times'
import auth from './ducks/auth'
import enrollList from './ducks/enrollList'

const rootReducer = combineReducers({
  themes,
  navigation,
  userList,
  user,
  timesList,
  time,
  auth,
  enrollList,
})

export default rootReducer
