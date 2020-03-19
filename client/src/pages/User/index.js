import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import MenuNavigationRouter from '../../components/MenuNavigationRouter'

import UserList from './UserList'
import UserEdit from './UserEdit'
import UserCreate from './UserCreate'
import NotFound from '../NotFound'
import UserDetail from './UserDetail'

function User() {
  return (
    <MenuNavigationRouter path={{ activeMenu: 'admin', activeSubMenu: '/app/user' }}>
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
        <Route path="/app/user/:id">
          <UserDetail />
        </Route>
        <Route path="/app/user/*">
          <NotFound />
        </Route>
      </Switch>
    </MenuNavigationRouter>
  )
}

export default User
