import React from 'react'
import { Layout } from 'antd'

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'

const { Header } = Layout

function AppHeader({ collapsed, onCollapseClick }) {
  return (
    <Header style={{ padding: '0 20px', backgroundColor: 'white' }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: onCollapseClick,
      })}
    </Header>
  )
}

export default AppHeader
