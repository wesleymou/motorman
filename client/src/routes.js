import React from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import UserCreate from "./pages/User/UserCreate";
import UserList from "./pages/User/UserList";
import UserEdit from "./pages/User/UserEdit";
import UserDetail from "./pages/User/UserDetail";

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
    menu: true,
    menuName:"Usuários",
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
    path: "/login",
    exact: true,
    component: () => <Login />,
    menu: false,
    restricted: false,
    permissions: []
  }
];

export default routes;
