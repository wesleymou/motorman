import React from 'react'
import { Route, Switch } from 'react-router-dom'

import MenuNavigationRouter from '~/components/MenuNavigationRouter'
import NotFound from '~/pages/NotFound'

import UserList from './UserList'
import UserEdit from './UserEdit'
import UserCreate from './UserCreate'
import UserDetail from './UserDetail'

function User() {
  return (
    <MenuNavigationRouter path={{ activeMenu: 'admin', activeSubMenu: '/app/user' }}>
      <Switch>
        <Route exact path="/app/user">
          <UserList />
        </Route>
        <Route exact path="/app/user/create">
          <UserCreate />
        </Route>
        <Route exact path="/app/user/edit/:id">
          <UserEdit />
        </Route>
        <Route exact path="/app/user/:id">
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
