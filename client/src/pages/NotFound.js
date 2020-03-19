import React from 'react'
import { Link } from 'react-router-dom'
import MenuNavigationRouter from '../components/MenuNavigationRouter'

export default function NotFound() {
  return (
    <MenuNavigationRouter>
      Página não encontrada
      <br />
      <Link to="/">Ir para a página inicial</Link>
    </MenuNavigationRouter>
  )
}
