import React from 'react'
import { Typography } from 'antd'

import { getPayload } from '../services/auth'

const { Title } = Typography

function Home() {
  return (
    <>
      <Title>Motorman</Title>
      <Title level={2}>América Locomotiva</Title>
      {JSON.stringify(getPayload())}
    </>
  )
}

export default Home
