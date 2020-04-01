import { combineReducers } from 'redux'
import themes from './ducks/themes'
import navigation from './ducks/navigation'
import userList from './ducks/userList'
import user from './ducks/user'
import timesList from "./ducks/timesList"
import time from "./ducks/times";

const rootReducer = combineReducers({
  themes,
  navigation,
  userList,
  user,
  timesList,
  time,
})

export default rootReducer
