import React from 'react'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'

import Home from './pages/Home'
import Login from './pages/Login'
import User from './pages/User'

const routes = [
  {
    path: '/app',
    exact: true,
    component: <Home />,
    menu: true,
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    restricted: true,
    permission: 1,
  },
  {
    path: '/app/user',
    component: <User />,
    menu: true,
    title: 'Usuários',
    icon: <UserOutlined />,
    restricted: true,
    permission: 1,
  },
  {
    path: '/login',
    exact: true,
    component: () => <Login />,
    menu: false,
    title: 'Login',
    icon: <UserOutlined />,
    restricted: false,
    permission: 0,
  },
]

export default routes
