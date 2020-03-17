import React from 'react'
import { Typography } from 'antd'

import { getPayload } from '../services/auth'

const { Paragraph } = Typography

function Home() {
  return (
    <>
      <Paragraph>Token do usuário logado:</Paragraph>
      <Paragraph>
        <pre>
          <code>{JSON.stringify(getPayload())}</code>
        </pre>
      </Paragraph>
    </>
  )
}

export default Home
