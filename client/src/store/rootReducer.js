import { combineReducers } from 'redux'
import auth from './ducks/auth'
import themes from './ducks/themes'
import navigation from './ducks/navigation'
import userList from './ducks/userList'
import user from './ducks/user'
import groups from './ducks/groups'
import teamList from './ducks/teamList'
import team from './ducks/team'
import teamRoles from './ducks/teamRoles'
import planList from './ducks/planList'
import plan from './ducks/plan'
import logTypes from './ducks/logTypes'
import event from './ducks/event'
import eventsList from './ducks/eventsList'

const rootReducer = combineReducers({
  auth,
  themes,
  navigation,
  userList,
  user,
  groups,
  teamList,
  teamRoles,
  team,
  planList,
  plan,
  logTypes,
  event,
  eventsList,
})

export default rootReducer
