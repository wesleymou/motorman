import React, { useEffect } from 'react'
import { Typography } from 'antd'
import MenuNavigationRouter from '../components/MenuNavigationRouter'

function Home() {
  useEffect(() => {
    document.title = 'Home - Motorman'
  })
  return (
    <MenuNavigationRouter path={{ activeMenu: '/app' }}>
      <Typography.Title className="text-center">Olá, seja bem-vindo(a)!</Typography.Title>
    </MenuNavigationRouter>
  )
}

export default Home
