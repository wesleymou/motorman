import React from 'react'

import Home from './pages/Home'
import Login from './pages/Login'
import User from './pages/User'

const routes = [
  {
    path: '/app',
    exact: true,
    component: <Home />,
    menu: true,
    restricted: true,
    permission: 1,
  },
  {
    path: '/app/user',
    component: <User />,
    menu: true,
    restricted: true,
    permission: 1,
  },
  {
    path: '/login',
    exact: true,
    component: () => <Login />,
    menu: false,
    restricted: false,
    permission: 0,
  },
]

export default routes
