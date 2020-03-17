import React from 'react'
import { Link } from 'react-router-dom'
import NavigationRouter from '../components/NavigationRouter'

export default function NotFound() {
  return (
    <NavigationRouter>
      Página não encontrada
      <br />
      <Link to="/">Ir para a página inicial</Link>
    </NavigationRouter>
  )
}
