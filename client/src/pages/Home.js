import React from 'react'
import { Typography } from 'antd'

import { getPayload } from '../services/auth'
import NavigationRouter from '../components/NavigationRouter'

const { Paragraph } = Typography

function Home() {
  return (
    <NavigationRouter path="/app">
      <Paragraph>Token do usuário logado:</Paragraph>
      <Paragraph>
        <pre>
          <code>{JSON.stringify(getPayload())}</code>
        </pre>
      </Paragraph>
    </NavigationRouter>
  )
}

export default Home
