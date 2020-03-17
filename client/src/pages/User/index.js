import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import UserList from './UserList'
import UserEdit from './UserEdit'
import UserCreate from './UserCreate'
import NavigationRouter from '../../components/NavigationRouter'
import NotFound from '../NotFound'

function User() {
  return (
    <NavigationRouter path="/app/user">
      <Switch>
        <Route exact path="/app/user">
          <Redirect to="/app/user/list" />
        </Route>
        <Route path="/app/user/list">
          <UserList />
        </Route>
        <Route path="/app/user/create">
          <UserCreate />
        </Route>
        <Route path="/app/user/edit/:id">
          <UserEdit />
        </Route>
        <Route path="/app/user/*">
          <NotFound />
        </Route>
      </Switch>
    </NavigationRouter>
  )
}

export default User
