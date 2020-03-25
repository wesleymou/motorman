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
    permission: ["autenticado"]
  },
  {
    path: "/app/user",
    component: <User />,
    menu: true,
    restricted: true,
    permission: [
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
    permission: ["criar usuarios"]
  },
  {
    path: "/app/user/list",
    component: <UserList />,
    menu: false,
    restricted: true,
    permission: ["listar usuarios"]
  },
  {
    path: "/app/user/edit/:id",
    component: <UserEdit />,
    menu: false,
    permission: ["editar usuarios"]
  },
  {
    path: "/app/user/:id",
    component: <UserDetail />,
    menu: false,
    permission: ["detalhar usuarios"]
  },
  {
    path: "/login",
    exact: true,
    component: () => <Login />,
    menu: false,
    restricted: false,
    permission: [0]
  }
];

export default routes;
