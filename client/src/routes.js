import React from 'react'

import Home from './pages/Home'
import Login from './pages/Login'
import User from './pages/User'
import Times from './pages/Times'

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
    path: "/app/times",
    component: <Times />,
    menu: true,
    menuName: "Times",
    restricted: true,
    permissions: [
      "cadastrar times",
      "listar times",
      "detalhar time",
      "editar time",
      "excluir time"
    ]
  },
  {
    path: '/login',
    exact: true,
    component: () => <Login />,
    menu: false,
    restricted: false,
    permission: [''],
  },
]

export default routes
