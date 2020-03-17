import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      Página não encontrada
      <br />
      <Link to="/">Ir para a página inicial</Link>
    </>
  )
}
