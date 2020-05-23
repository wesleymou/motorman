import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import MenuNavigationRouter from '../../components/MenuNavigationRouter'
import NotFound from '../NotFound'
import TeamList from './TeamList'
import TeamEdit from './TeamEdit'
import TeamCreate from './TeamCreate'
import TeamDetail from './TeamDetail'
import AccessControl from '~/components/AccessControl'

function Team() {
  return (
    <AccessControl permission="application/teams/manage">
      <MenuNavigationRouter path={{ activeMenu: 'admin', activeSubMenu: '/app/team' }}>
        <Switch>
          <Route exact path="/app/team">
            <Redirect to="/app/team/list" />
          </Route>
          <Route exact path="/app/team/list">
            <TeamList />
          </Route>
          <Route exact path="/app/team/create">
            <TeamCreate />
          </Route>
          <Route exact path="/app/team/edit/:id">
            <TeamEdit />
          </Route>
          <Route exact path="/app/team/:id">
            <TeamDetail visualization="members" />
          </Route>
          <Route exact path="/app/team/*">
            <NotFound />
          </Route>
        </Switch>
      </MenuNavigationRouter>
    </AccessControl>
  )
}

export default Team
