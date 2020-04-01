import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import MenuNavigationRouter from '../../components/MenuNavigationRouter'

import TimesList from './TimesList'
import TimesEdit from './TimesEdit'
import TimesCreate from './TimesCreate'
import NotFound from '../NotFound'
import TimesDetail from './TimesDetail'

function Times() {
  return (
    <MenuNavigationRouter path={{ activeMenu: 'admin', activeSubMenu: '/app/times' }}>
      <Switch>
        <Route exact path="/app/times">
          <Redirect to="/app/times/list" />
        </Route>
        <Route path="/app/times/list">
          <TimesList />
        </Route>
        <Route path="/app/times/create">
          <TimesCreate />
        </Route>
        <Route path="/app/times/edit/:id">
          <TimesEdit />
        </Route>
        <Route path="/app/times/:id">
          <TimesDetail />
        </Route>
        <Route path="/app/times/*">
          <NotFound />
        </Route>
      </Switch>
    </MenuNavigationRouter>
  )
}

export default Times