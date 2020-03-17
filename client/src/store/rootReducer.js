import { combineReducers } from 'redux'
import themes from './ducks/themes'
import navigation from './ducks/navigation'

const rootReducer = combineReducers({
  themes,
  navigation,
})

export default rootReducer
