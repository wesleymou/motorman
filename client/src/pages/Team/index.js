import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import MenuNavigationRouter from '../../components/MenuNavigationRouter'
import NotFound from '../NotFound'
import TeamList from './TeamList'
import TeamEdit from './TeamEdit'
import TeamCreate from './TeamCreate'
import TeamDetail from './TeamDetail'

function Team() {
  return (
    <MenuNavigationRouter path={{ activeMenu: 'admin', activeSubMenu: '/app/team' }}>
      <Switch>
        <Route exact path="/app/team">
          <Redirect to="/app/team/list" />
        </Route>
        <Route path="/app/team/list">
          <TeamList />
        </Route>
        <Route path="/app/team/create">
          <TeamCreate />
        </Route>
        <Route path="/app/team/edit/:id">
          <TeamEdit />
        </Route>
        <Route path="/app/team/:id">
          <TeamDetail />
        </Route>
        <Route path="/app/team/*">
          <NotFound />
        </Route>
      </Switch>
    </MenuNavigationRouter>
  )
}

export default Team
