import React from 'react'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
import Home from './pages/Home'
import Times from './pages/Times'

import Login from './pages/Login'

const routes = [
  {
    path: '/app',
    component: <Home />,
    menu: true,
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    restricted: true,
    permission:1
  },
  {
    path: '/app/times',
    component: <Times />,
    menu: true,
    title: 'Times',
    icon: <UserOutlined />,
    restricted: true,
    permission:1
  },
  {
    path:'/login',
    component:() => <Login />,
    menu: false,
    title: 'Login',
    icon: <UserOutlined />,
    restricted: false,
    permission:0
  }
]

export default routes
