import React from 'react'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
import Home from './pages/Home'
import Times from './pages/Times'

const routes = [
  {
    path: '/app',
    component: <Home />,
    menu: true,
    title: 'Dashboard',
    icon: <DashboardOutlined />,
  },
  {
    path: '/app/times',
    component: <Times />,
    menu: true,
    title: 'Times',
    icon: <UserOutlined />,
  },
]

export default routes
