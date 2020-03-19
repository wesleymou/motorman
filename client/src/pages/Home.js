import React from 'react'
import { Typography } from 'antd'

import { getPayload } from '../services/auth'
import MenuNavigationRouter from '../components/MenuNavigationRouter'

const { Paragraph } = Typography

function Home() {
  return (
    <MenuNavigationRouter path={{ activeMenu: '/app' }}>
      <Paragraph>Token do usuário logado:</Paragraph>
      <Paragraph>
        <pre>
          <code>{JSON.stringify(getPayload())}</code>
        </pre>
      </Paragraph>
    </MenuNavigationRouter>
  )
}

export default Home
