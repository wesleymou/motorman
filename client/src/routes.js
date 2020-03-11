import React from 'react'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
import Home from './pages/Home'
import Times from './pages/Times'

const routes = [
  {
    path: '/',
    component: () => <Home />,
    menu: true,
    title: 'Dashboard',
    icon: <DashboardOutlined />,
  },
  {
    path: '/times',
    component: () => <Times />,
    menu: true,
    title: 'Times',
    icon: <UserOutlined />,
  },
]

export default routes
