import React from "react"

import Home from "./pages/Home"
import Login from "./pages/Login"
import User from "./pages/User"
import UserCreate from "./pages/User/UserCreate"
import UserList from "./pages/User/UserList"
import UserEdit from "./pages/User/UserEdit"
import UserDetail from "./pages/User/UserDetail"
import Times from './pages/Times'
import { UserOutlined, TeamOutlined } from '@ant-design/icons'

const routes = [
  {
    path: "/app",
    exact: true,
    component: <Home />,
    menu: true,
    restricted: true,
    permissions: ["autenticado"]
  },
  {
    path: "/app/user",
    component: <User />,
    icon: <UserOutlined />,
    menu: true,
    menuName: "Usuários",
    restricted: true,
    permissions: [
      "criar usuarios",
      "detalhar usuarios",
      "listar usuarios",
      "editar usuarios"
    ]
  },
  {
    path: "/app/user/create",
    component: <UserCreate />,
    menu: false,
    restricted: true,
    permissions: ["criar usuarios"]
  },
  {
    path: "/app/user/list",
    component: <UserList />,
    menu: false,
    restricted: true,
    permissions: ["listar usuarios"]
  },
  {
    path: "/app/user/edit/:id",
    component: <UserEdit />,
    menu: false,
    permissions: ["editar usuarios"]
  },
  {
    path: "/app/user/:id",
    component: <UserDetail />,
    menu: false,
    permissions: ["detalhar usuarios"]
  },
  {
    path: "/app/times",
    component: <Times />,
    icon: <TeamOutlined />,
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
    path: "/login",
    exact: true,
    component: () => <Login />,
    menu: false,
    restricted: false,
    permission: [''],
  },
]

export default routes;
