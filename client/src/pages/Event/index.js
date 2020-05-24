import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import MenuNavigationRouter from '../../components/MenuNavigationRouter'
import NotFound from '../NotFound'

import EventList from './EventList'
import EventEdit from './EventEdit'
import EventCreate from './EventCreate'
import EventDetail from './EventDetail'
import AccessControl from '~/components/AccessControl'

function Event() {
  return (
    <AccessControl permission="application/events/manage">
      <MenuNavigationRouter path={{ activeMenu: 'admin', activeSubMenu: '/app/event' }}>
        <Switch>
          <Route exact path="/app/event">
            <Redirect to="/app/event/list" />
          </Route>
          <Route exact path="/app/event/list">
            <EventList />
          </Route>
          <Route exact path="/app/event/create">
            <EventCreate />
          </Route>
          <Route exact path="/app/event/create/:id">
            <EventCreate />
          </Route>
          <Route exact path="/app/event/edit/:id">
            <EventEdit />
          </Route>
          <Route exact path="/app/event/:id">
            <EventDetail />
          </Route>
          <Route exact path="/app/event/*">
            <NotFound />
          </Route>
        </Switch>
      </MenuNavigationRouter>
    </AccessControl>
  )
}

export default Event
