import React from 'react'
import { Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'

export const authenticate = (login, password) => {
  // TODO
  window.localStorage.setItem(
    'TOKEN',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWxpZGl0eSI6dHJ1ZSwicGVybWlzc2lvbiI6MX0.Brm3XTqJfoHsE-z-CRoXd0XlzG_olGJtC1kvvDBXE4Q'
  )
  return true
}

export const isValid = permission => {
  const token = window.localStorage.getItem('TOKEN')
  const decoded = jwt.decode(token)

  if (token && decoded.validity === true)
    if (permission >= Number.parseInt(decoded.permission)) return true
    else return false
  return false
}

export const logout = () => {
  window.localStorage.removeItem('TOKEN')
}

export default function IsAuthenticated({ permission }) {
  if (isValid(permission)) return ''
  return <Redirect to={{ pathname: '/login/' }} />
}
