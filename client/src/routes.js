import React from 'react'

import { UserOutlined, TeamOutlined, DollarOutlined } from '@ant-design/icons'
import Home from './pages/Home'
import Login from './pages/Login'
import User from './pages/User'
import Team from './pages/Team'
import MyProfile from './pages/MyProfile'
import MyAccount from './pages/MyAccount'
import Plan from './pages/Plan'

const routes = [
  {
    path: '/app',
    exact: true,
    component: <Home />,
    menu: true,
    restricted: true,
    permissions: ['autenticado'],
  },
  {
    path: '/app/user',
    component: <User />,
    icon: <UserOutlined />,
    menu: true,
    menuName: 'Usuários',
    restricted: true,
  },
  {
    path: '/app/team',
    component: <Team />,
    icon: <TeamOutlined />,
    menu: true,
    menuName: 'Times',
    restricted: true,
  },
  {
    path: '/app/plan',
    component: <Plan />,
    icon: <DollarOutlined />,
    menu: true,
    menuName: 'Planos',
    restricted: true,
  },
  {
    path: '/app/my-profile',
    component: <MyProfile />,
  },
  {
    path: '/app/my-account',
    component: <MyAccount />,
  },
  {
    path: '/login',
    exact: true,
    component: () => <Login />,
    menu: false,
    restricted: false,
  },
]

export default routes
